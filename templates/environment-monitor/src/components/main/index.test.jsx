import {
  describe, it, expect, afterEach, beforeEach, vi,
} from 'vitest';
import {
  render, screen, cleanup, act,
} from '@testing-library/react';

const state = { media: {} };

vi.mock('@dsplay/react-template-utils', () => ({
  useMedia: () => state.media,
}));

import Main from '.';

const station = (id, name, last1hMm, intensity) => ({
  id, name, operator: 'CEMADEN', city: 'RECIFE', observedAt: '2026-11-14T18:50:00.000Z', last1hMm, intensity,
});

const result = {
  generatedAt: '2026-11-14T19:00:00.000Z',
  unavailable: [],
  sources: {
    rainfall: { name: 'CEMADEN', attribution: { text: 'CEMADEN – Centro Nacional' } },
    rivers: { name: 'APAC', attribution: { text: 'APAC – Agência Pernambucana' } },
  },
  summary: { rainfall: { stationsReporting: 5, stationsRaining: 3, maxLast1hMm: 31.2 } },
  rainfall: [
    station('1', 'Ibura', 31.2, 'very_heavy'),
    station('2', 'Dois Unidos', 4.4, 'moderate'),
    station('3', 'Muribeca', 0.8, 'light'),
    station('4', 'Moreno', 0, 'none'),
  ],
  rivers: [{
    id: 'R1', name: 'Engenho Velho', river: 'Capibaribe', levelCm: 248, status: 'alert', thresholds: { attention: 200, alert: 230, flood: 330 },
  }],
  alerts: [],
};

function setMedia(media) {
  state.media = media;
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Main', () => {
  it('draws what the answer holds and nothing it does not: the sections of absent datasets are left out', () => {
    setMedia({ duration: 30000, result });
    render(<Main />);
    expect(screen.getByText('Precipitação')).toBeInTheDocument();
    expect(screen.getByText('Ibura')).toBeInTheDocument();
    expect(screen.queryByText('Moreno')).not.toBeInTheDocument(); // no rain in the last hour
    expect(screen.getByText('Nível dos Rios')).toBeInTheDocument();
    expect(screen.getByText('CEMADEN / APAC')).toBeInTheDocument();
    expect(screen.getByText('Fonte: CEMADEN – Centro Nacional · APAC – Agência Pernambucana')).toBeInTheDocument();
    expect(screen.getByText(/Alerta — Capibaribe/)).toBeInTheDocument(); // the banner
    expect(screen.queryByText('Condições Meteorológicas')).not.toBeInTheDocument();
    expect(screen.queryByText('Mesoregião')).not.toBeInTheDocument();
  });

  it('pages the rain cards by what the grid holds, each page for the media duration divided by the pages', () => {
    const many = Array.from({ length: 11 }, (_, i) => station(`s${i}`, `Station ${i}`, 20 - i, 'heavy'));
    setMedia({ duration: 20000, result: { ...result, rainfall: many } });
    render(<Main />);
    expect(screen.getByText('Station 0')).toBeInTheDocument();
    expect(screen.getByText('Station 7')).toBeInTheDocument(); // 8 cards in the 2x4 grid
    expect(screen.queryByText('Station 8')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(9999));
    expect(screen.queryByText('Station 8')).not.toBeInTheDocument(); // 11 raining stations: 2 pages of 10 s
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText('Station 8')).toBeInTheDocument();
    expect(screen.getByText('Station 10')).toBeInTheDocument();
    expect(screen.queryByText('Station 0')).not.toBeInTheDocument();
  });

  it('says so when a dataset failed, and survives an answer with nothing in it', () => {
    setMedia({ duration: 30000, result: { ...result, unavailable: ['alerts'] } });
    render(<Main />);
    expect(screen.getByText('Atualização parcial')).toBeInTheDocument();
    cleanup();
    setMedia({ duration: 30000 });
    render(<Main />);
    expect(screen.getByText('Monitoramento Meteorológico')).toBeInTheDocument();
  });
});

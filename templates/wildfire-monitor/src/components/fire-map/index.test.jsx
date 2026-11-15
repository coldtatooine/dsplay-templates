import {
  describe, it, expect, afterEach,
} from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { INTENSITY_COLORS } from '../main/model';
import FireMap from '.';

const renderMap = (props) => render(<I18nextProvider i18n={i18n}><FireMap dot={7} {...props} /></I18nextProvider>);

afterEach(cleanup);

const points = [
  {
    lat: -8, lon: -35, count: 10, recent: 8, frpMw: 20,
  },
  {
    lat: -7.5, lon: -34.8, count: 2, recent: 0, frpMw: 3,
  },
];

describe('FireMap', () => {
  it('draws a dot per cell, coloured by the strongest fire in it, and faint with no detection in the last 24 hours', () => {
    const { container } = renderMap({ data: { scope: { type: 'world' }, points } });
    const dots = [...container.querySelectorAll('svg circle')];
    expect(dots).toHaveLength(2);
    // 20 MW is deep orange, 3 MW is yellow; the second cell has nothing in the last 24 hours
    expect(dots.map((d) => d.getAttribute('fill'))).toEqual([INTENSITY_COLORS[0], INTENSITY_COLORS[2]]);
    expect(dots.map((d) => d.getAttribute('fill-opacity'))).toEqual(['0.4', '0.85']);
  });

  it('draws the circle of a radius scope', () => {
    const { container } = renderMap({ data: { scope: { type: 'radius', lat: -8, lon: -35, radiusKm: 300 }, points } });
    expect(container.querySelector('.fire-map__radius')).not.toBeNull();
  });

  it('draws the countries once their outlines have loaded, lighting the scope country', async () => {
    const { container } = renderMap({ data: { scope: { type: 'country', country: 'BR', lat: -8, lon: -35 }, points } });
    await waitFor(() => expect(container.querySelectorAll('.fire-map__land').length).toBeGreaterThan(0));
    expect(container.querySelector('.fire-map__land--scope')).not.toBeNull();
  });

  it('says what the colours mean', () => {
    const { container } = renderMap({ data: { scope: { type: 'world' }, points } });
    expect(container.querySelector('.fire-map__legend')).toHaveTextContent('Fire intensity');
    expect(container.querySelectorAll('.fire-map__legend-swatch')).toHaveLength(4);
  });

  it('draws the dots even with no points to show on a world map', () => {
    const { container } = renderMap({ data: { scope: { type: 'world' }, points: [] } });
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelectorAll('svg circle')).toHaveLength(0);
  });
});

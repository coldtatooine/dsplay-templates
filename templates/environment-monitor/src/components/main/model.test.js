import { describe, it, expect } from 'vitest';
import {
  FALLBACK_PAGE_MS,
  bannerItems,
  pageInterval,
  rainingStations,
  riverProgress,
  riverStatusClass,
  shortRegionName,
  sourceNames,
} from './model';

describe('pageInterval', () => {
  it('splits the media duration across the pages, so that the pages together last as long as the media', () => {
    expect(pageInterval(30000, 3)).toBe(10000);
    expect(pageInterval(30000, 1)).toBe(30000);
    expect(pageInterval(10000, 3)).toBe(3333);
  });

  it('never goes below one second, and falls back when the duration or the pages are unknown', () => {
    expect(pageInterval(2000, 10)).toBe(1000);
    expect(pageInterval(undefined, 3)).toBe(FALLBACK_PAGE_MS);
    expect(pageInterval(0, 3)).toBe(FALLBACK_PAGE_MS);
    expect(pageInterval(30000, 0)).toBe(FALLBACK_PAGE_MS);
  });
});

describe('rainingStations', () => {
  it('keeps the stations with rain in the last hour and an intensity, in the order served', () => {
    const rainfall = [
      { id: 'a', last1hMm: 5, intensity: 'moderate' },
      { id: 'b', last1hMm: 0, intensity: 'none' },
      { id: 'c', last1hMm: null, intensity: null },
      { id: 'd', last1hMm: 1, intensity: 'light' },
    ];
    expect(rainingStations(rainfall).map((s) => s.id)).toEqual(['a', 'd']);
    expect(rainingStations(undefined)).toEqual([]);
  });
});

describe('bannerItems', () => {
  const river = (id, status, levelCm = 250) => ({
    id, name: `Station ${id}`, river: 'Capibaribe', status, levelCm,
  });

  it('lists the rivers above their attention level and the warnings, most serious first', () => {
    const items = bannerItems(
      [river('1', 'attention'), river('2', 'normal'), river('3', 'flood', 340.04)],
      [{
        id: 'w', event: 'Chuvas Intensas', severity: 'moderate', areas: ['Recife'], areaCount: 3,
      }],
    );
    expect(items.map((i) => i.key)).toEqual(['river-3', 'alert-w', 'river-1']);
    expect(items[0]).toMatchObject({ status: 'enchente', text: 'Enchente — Capibaribe (340.0 cm)' });
    expect(items[1]).toMatchObject({ status: 'alerta', text: 'Chuvas Intensas (Recife e mais 2)' });
  });

  it('is empty when nothing is above normal, or when the datasets are absent', () => {
    expect(bannerItems([river('1', 'normal')], [])).toEqual([]);
    expect(bannerItems(undefined, undefined)).toEqual([]);
  });
});

describe('riverProgress', () => {
  it('is the level against the highest stage the state sets, capped at the full bar', () => {
    const thresholds = { attention: 200, alert: 230, flood: 330 };
    expect(riverProgress({ levelCm: 165, thresholds })).toBe(50);
    expect(riverProgress({ levelCm: 400, thresholds })).toBe(100);
    expect(riverProgress({ levelCm: 100, thresholds: { attention: null, alert: 200, flood: null } })).toBe(50);
  });

  it('is half full for a river with no stage at all, and empty at zero', () => {
    expect(riverProgress({ levelCm: 80, thresholds: { attention: null, alert: null, flood: null } })).toBe(50);
    expect(riverProgress({ levelCm: 0, thresholds: {} })).toBe(0);
  });
});

describe('names', () => {
  it('colours a river by its status, and shortens the mesoregions of Pernambuco', () => {
    expect(riverStatusClass('alert')).toBe('alerta');
    expect(riverStatusClass('normal')).toBe('normal');
    expect(shortRegionName('Metropolitana de Recife')).toBe('RMR');
    expect(shortRegionName('Another region')).toBe('Another region');
  });

  it('names each source once', () => {
    expect(sourceNames({ rainfall: { name: 'CEMADEN' }, rivers: { name: 'APAC' }, climate: { name: 'APAC' } })).toEqual(['CEMADEN', 'APAC']);
    expect(sourceNames(undefined)).toEqual([]);
  });
});

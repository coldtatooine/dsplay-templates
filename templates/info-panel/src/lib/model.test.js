import { describe, it, expect } from 'vitest';
import {
  readPanel, bodyOf, weatherKind, readQuotes, formatTemp, shorten, pick, typeOfId,
} from './model';

const NOW = new Date(2026, 10, 21, 9, 14);
const answer = (extra = {}) => ({
  result: {
    order: ['clock', 'weather', 'quotes', 'news', 'holidays', 'countdown', 'jokes', 'logo'],
    fixed: ['clock', 'weather', 'quotes', 'logo'],
    rotating: ['news', 'holidays', 'countdown', 'jokes'],
    widgets: {
      clock: { type: 'clock', status: 'ok', data: { hour12: false } },
      weather: { type: 'weather', status: 'ok', data: { weather: { city: 'São Paulo', current: { temp: 27.6, icon: 'c02d' } } } },
      quotes: { type: 'quotes', status: 'ok', data: { items: [{ code: 'usd', price: 5.1305, changePct: 0.4 }, { code: 'eur', price: 5.56, changePct: -0.3 }] } },
      logo: { type: 'logo', status: 'ok', data: { url: 'https://example.com/logo.png' } },
      news: { type: 'news', status: 'ok', data: { items: [{ title: 'A', description: '<p>Obra tem 12 km</p>' }, { title: 'B' }] } },
      holidays: { type: 'holidays', status: 'ok', data: { date: '2026-11-21', holidays: [{ date: '2026-11-20', name: 'Consciência Negra' }, { date: '2026-12-25', name: 'Natal' }] } },
      countdown: { type: 'countdown', status: 'ok', data: { date: '2026-11-27T00:00', title: 'a Black Friday' } },
      jokes: { type: 'jokes', status: 'ok', data: { jokes: [{ setup: 'Por quê?', punchline: 'Porque sim.' }] } },
    },
    ...extra,
  },
});

describe('readPanel', () => {
  it('lists the widgets in the customer\'s order, with the rotating area where the first rotating widget was', () => {
    const panel = readPanel(answer(), { lng: 'pt', now: NOW });
    expect(panel.order).toEqual(['clock', 'weather', 'quotes', 'rot', 'logo']);
  });

  it('turns every rotating widget into a slide, a joke taking two turns', () => {
    const panel = readPanel(answer(), { lng: 'pt', now: NOW });
    expect(panel.slides.map((s) => s.type)).toEqual(['news', 'holiday', 'countdown', 'joke']);
    expect(panel.slots).toBe(5);
    expect(panel.slides[1]).toMatchObject({ big: '34', headline: 'dias para Natal' });
    expect(panel.slides[2]).toMatchObject({ big: '5', headline: 'dias para a Black Friday' });
    expect(panel.slides[3]).toMatchObject({ headline: 'Por quê?', alt: 'Porque sim.' });
  });

  it('shows the next headline at each showing', () => {
    expect(readPanel(answer(), { iteration: 0, now: NOW }).slides[0].headline).toBe('A');
    expect(readPanel(answer(), { iteration: 1, now: NOW }).slides[0].headline).toBe('B');
  });

  it('leaves out a widget that failed, and the answer still plays', () => {
    const base = answer();
    base.result.widgets.weather = { type: 'weather', status: 'error', code: 'timeout' };
    base.result.fixed = ['clock', 'quotes', 'logo'];
    base.result.order = ['clock', 'quotes', 'logo'];
    base.result.rotating = [];
    const panel = readPanel(base, { now: NOW });
    expect(panel.order).toEqual(['clock', 'quotes', 'logo']);
    expect(panel.slides).toEqual([]);
  });

  it('falls back to fixed then rotating when the answer has no order', () => {
    const base = answer();
    delete base.result.order;
    expect(readPanel(base, { now: NOW }).order).toEqual(['clock', 'weather', 'quotes', 'logo', 'rot']);
  });

  it('is null when the media carries no panel answer', () => {
    expect(readPanel({}, {})).toBeNull();
    expect(readPanel({ result: { items: [] } }, {})).toBeNull();
  });

  it('reads the answer kept inside the player\'s envelope', () => {
    const body = answer().result;
    expect(bodyOf({ result: { data: body } })).toBe(body);
    expect(readPanel({ result: { validity: 'x', data: answer().result } }, { now: NOW }).order).toContain('weather');
  });
});

describe('pieces', () => {
  it('names the drawing of a weather icon', () => {
    expect(['c01d', 'c02n', 't04d', 'r01d', 's01d', 'a01d', 'c04d', undefined].map(weatherKind)).toEqual(['sun', 'partly', 'storm', 'rain', 'snow', 'fog', 'cloud', 'cloud']);
  });

  it('writes the temperature in celsius or fahrenheit', () => {
    expect(formatTemp(27.6, 'Celsius')).toBe('28°');
    expect(formatTemp(0, 'Fahrenheit')).toBe('32°');
  });

  it('reads two currencies with their change and drops the ones without a price', () => {
    const quotes = readQuotes({ items: [{ code: 'usd', price: 5.13, changePct: 0.4 }, { code: 'xxx', price: 0 }, { code: 'eur', price: 5.56, changePct: -0.3 }] }, 'en');
    expect(quotes).toEqual([
      { code: 'USD', value: '5.13', dir: 'up', arrow: '▲', pct: '0.40%' },
      { code: 'EUR', value: '5.56', dir: 'down', arrow: '▼', pct: '0.30%' },
    ]);
  });

  it('shortens at a word and strips tags', () => {
    expect(shorten('<b>um dois três</b> quatro cinco', 14)).toBe('um dois três…');
    expect(shorten('curto', 14)).toBe('curto');
  });

  it('picks by iteration and strips the counter suffix of an id', () => {
    expect(pick(['a', 'b'], 3)).toBe('b');
    expect(pick([], 1)).toBeNull();
    expect(typeOfId('countdown-2')).toBe('countdown');
  });
});

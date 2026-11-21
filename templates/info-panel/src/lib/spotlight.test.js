import { describe, it, expect } from 'vitest';
import { readSpotlight, chartPoints } from './spotlight';

const NOW = new Date(2026, 10, 21, 9, 14);
const answer = () => ({
  result: {
    order: ['clock', 'weather', 'quotes', 'news', 'holidays', 'countdown', 'jokes', 'logo'],
    fixed: ['clock', 'weather', 'quotes', 'logo'],
    rotating: ['news', 'holidays', 'countdown', 'jokes'],
    widgets: {
      clock: { type: 'clock', status: 'ok', data: {} },
      weather: {
        type: 'weather',
        status: 'ok',
        data: {
          weather: {
            city: 'São Paulo',
            current: { temp: 28, icon: 'c02d', description: 'Parcialmente nublado', humidity: 62, wind: 4, min: 21, max: 29, sunrise: '05:40', sunset: '18:20' },
            forecast: [{ date: '2026-11-22', min: 20, max: 27, icon: 'c04d' }, { date: '2026-11-23', min: 19, max: 26, icon: 'r01d' }],
          },
        },
      },
      quotes: { type: 'quotes', status: 'ok', data: { items: [{ code: 'USD', name: 'US Dollar', price: 5.13, changePct: 0.4, series: [5.0, 5.1, 5.2, 5.13] }, { code: 'EUR', name: 'Euro', price: 5.56, changePct: -0.3, series: [] }] } },
      news: { type: 'news', status: 'ok', data: { title: 'Canal 12', items: [{ title: 'Uma notícia', description: 'Detalhe', images: ['https://example.com/a.jpg'] }] } },
      holidays: { type: 'holidays', status: 'ok', data: { date: '2026-11-21', holidays: [{ date: '2026-12-25', name: 'Natal' }, { date: '2027-01-01', name: 'Ano Novo' }, { date: '2026-11-20', name: 'Ontem' }] } },
      countdown: { type: 'countdown', status: 'ok', data: { date: '2026-11-27T00:00', title: 'a Black Friday' } },
      jokes: { type: 'jokes', status: 'ok', data: { jokes: [{ setup: 'Por quê?', punchline: 'Porque sim.' }] } },
      logo: { type: 'logo', status: 'ok', data: { url: 'https://example.com/logo.png' } },
    },
  },
});

describe('readSpotlight', () => {
  it('makes a slide of every widget in the order of the answer, the quotes being one slide', () => {
    const { slides } = readSpotlight(answer(), { lng: 'pt', now: NOW });
    expect(slides.map((s) => s.kind)).toEqual(['clock', 'weather', 'quotes2', 'news', 'hol', 'count', 'joke', 'logo']);
    expect(slides.map((s) => s.delay)).toEqual(['0s', '8s', '16s', '24s', '32s', '40s', '48s', '56s']);
  });

  it('reads the weather in detail: the facts, today and the forecast', () => {
    const weather = readSpotlight(answer(), { lng: 'pt', now: NOW }).slides[1];
    expect(weather).toMatchObject({ temp: '28°C', wx: 'partly', tagText: 'São Paulo', text: 'Parcialmente nublado' });
    expect(weather.facts.map((f) => f.v)).toEqual(['62%', '14 km/h', '05:40', '18:20']);
    expect(weather.days.map((d) => [d.hi, d.lo])).toEqual([['29°', '21°'], ['27°', '20°'], ['26°', '19°']]);
    expect(weather.days[0].d).toBe('Hoje');
  });

  it('writes the temperature in Fahrenheit, with its letter, when the widget was set to F', () => {
    const base = answer();
    base.result.widgets.weather.data.unit = 'F';
    const weather = readSpotlight(base, { lng: 'pt', now: NOW }).slides[1];
    expect(weather.temp).toBe('82°F');
    expect(weather.days[0]).toMatchObject({ hi: '84°', lo: '70°' });
    expect(weather.line).toBe('São Paulo · 82°F · Parcialmente nublado');
  });

  it('draws the chart only for a currency that has a series', () => {
    const quotes = readSpotlight(answer(), { lng: 'pt', now: NOW }).slides[2];
    expect(quotes.items[0]).toMatchObject({ tagText: 'USD', b: '5,13', delta: '▲ 0,40%', lo: '5,00', hi: '5,20' });
    expect(quotes.items[0].series.split(' ')).toHaveLength(4);
    expect(quotes.items[1]).toMatchObject({ tagText: 'EUR', b: '5,56', delta: '▼ 0,30%', series: '', lo: '' });
  });

  it('shows the photo of the news item, the next three holidays and the counter in days, hours and minutes', () => {
    const { slides } = readSpotlight(answer(), { lng: 'pt', now: NOW });
    expect(slides[3]).toMatchObject({ image: 'https://example.com/a.jpg', title: 'Uma notícia', tagText: 'Notícias · Canal 12' });
    expect(slides[4].rows.map((r) => [r.n, r.w])).toEqual([['Natal', 'em 34 dias'], ['Ano Novo', 'em 41 dias']]);
    expect(slides[5]).toMatchObject({ big: '5', title: 'dias para a Black Friday' });
    expect(slides[5].text).toContain('5 d 14 h 46 min');
  });

  it('keeps the clock and the logo on the top bar when they are pinned, and out of the loop', () => {
    const { slides, pinned } = readSpotlight(answer(), { lng: 'pt', now: NOW, pin: true });
    expect(slides.map((s) => s.kind)).not.toContain('clock');
    expect(slides.map((s) => s.kind)).not.toContain('logo');
    expect(pinned.clock).toEqual({ hour12: false, timezone: '' });
    expect(pinned.logo).toEqual({ url: 'https://example.com/logo.png' });
  });

  it('leaves out a widget that failed, and is null when the media has no answer', () => {
    const base = answer();
    base.result.widgets.weather = { type: 'weather', status: 'error', code: 'timeout' };
    expect(readSpotlight(base, { now: NOW }).slides.map((s) => s.kind)).not.toContain('weather');
    expect(readSpotlight({}, {})).toBeNull();
  });
});

describe('chartPoints', () => {
  it('scales a series into the 290x100 box, and is empty below two values', () => {
    expect(chartPoints([1, 3, 2])).toBe('0,90.0 145,10.0 290,50.0');
    expect(chartPoints([1])).toBe('');
    expect(chartPoints(undefined)).toBe('');
  });
});

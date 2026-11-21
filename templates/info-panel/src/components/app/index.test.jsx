import {
  describe, it, expect, afterEach, beforeEach, vi,
} from 'vitest';
import { render, cleanup } from '@testing-library/react';

vi.mock('@dsplay/react-template-utils', async () => (await import('../../test-support/mock-utils')).mockUtils());

const { player } = await import('../../test-support/mock-utils');
const { default: App } = await import('.');

const answer = {
  order: ['clock', 'weather', 'quotes', 'news', 'logo'],
  fixed: ['clock', 'weather', 'quotes', 'logo'],
  rotating: ['news'],
  widgets: {
    clock: { type: 'clock', status: 'ok', data: {} },
    weather: { type: 'weather', status: 'ok', data: { weather: { city: 'Lisboa', current: { temp: 21, icon: 'c01d' } } } },
    quotes: { type: 'quotes', status: 'ok', data: { items: [{ code: 'USD', price: 5.13, changePct: 0.4 }, { code: 'EUR', price: 5.56, changePct: -0.3 }] } },
    news: { type: 'news', status: 'ok', data: { items: [{ title: 'Uma notícia' }] } },
    logo: { type: 'logo', status: 'ok', data: { url: 'https://example.com/logo.png' } },
  },
};

const screen = (width, height, template = {}) => {
  window.innerWidth = width;
  window.innerHeight = height;
  player.template = template;
};

beforeEach(() => {
  player.media = { duration: 30000, result: answer };
  screen(1920, 120);
});
afterEach(cleanup);

describe('App', () => {
  it('draws every widget of the answer in a strip', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.ip.fmt-slim.s120.st-classic.flat')).not.toBeNull();
    expect(container.querySelector('.wk-clock')).not.toBeNull();
    expect(container.querySelector('.wk-weather .wx-t').textContent).toBe('21°');
    expect([...container.querySelectorAll('.q-c')].map((n) => n.textContent)).toEqual(['USD', 'EUR']);
    expect(container.querySelector('.wk-logo img').getAttribute('src')).toBe('https://example.com/logo.png');
    expect(container.querySelector('.rot .headline').textContent).toBe('Uma notícia');
  });

  it('keeps the customer\'s order: the rotating area where the first rotating widget was', () => {
    const { container } = render(<App />);
    const keys = [...container.querySelector('.ip').children].map((n) => n.className.split(' ')[0]);
    expect(keys).toEqual(['bg', 'w', 'w', 'w', 'rot', 'anchor']);
  });

  it('groups the widgets in tiles on a landscape screen and shows the city', () => {
    screen(1920, 1080);
    const { container } = render(<App />);
    expect(container.querySelector('.ip.fmt-landscape .fx .wk-weather .wx-p').textContent).toBe('Lisboa');
  });

  it('takes the style and the colors from the template variables', () => {
    screen(1920, 120, {
      style: 'newsroom', bg_color: '#123456', text_color: 'yellow', currency_box_color: 'white', currency_text_color: '#222', sponsor_logo_box_color: '#eee',
    });
    const { container } = render(<App />);
    expect(container.querySelector('.ip').className).toContain('st-newsroom');
    expect(container.querySelector('.ip').style.color).toBe('yellow');
    expect(container.querySelector('.bg').style.backgroundColor).toBe('rgb(18, 52, 86)');
    expect(container.querySelector('.q-v').style.color).toBe('rgb(34, 34, 34)');
    expect(container.querySelector('.logo').style.backgroundColor).toBe('rgb(238, 238, 238)');
  });

  it('keeps the style it knows when the variable is something else', () => {
    screen(1920, 120, { style: 'nope' });
    const { container } = render(<App />);
    expect(container.querySelector('.ip').className).toContain('st-classic');
  });

  it('shows the temperature in fahrenheit when the template asks for it', () => {
    screen(1920, 120, { weather_unit: 'Fahrenheit' });
    const { container } = render(<App />);
    expect(container.querySelector('.wx-t').textContent).toBe('70°');
  });

  it('draws only the background when the media carries no panel answer', () => {
    player.media = { duration: 30000 };
    const { container } = render(<App />);
    expect(container.querySelector('.bg')).not.toBeNull();
    expect(container.querySelector('.w')).toBeNull();
  });
});

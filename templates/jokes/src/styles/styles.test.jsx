import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

vi.mock('@dsplay/react-template-utils', async () => (await import('../test-support/mock-utils')).mockUtils());

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { player } from '../test-support/mock-utils';
import { exampleResult } from '../test-support/fixture';
import { readJokes } from '../lib/model';
import { PLATES } from '../lib/layout';
import { STYLES, CMS_TYPE, DEFAULT_STYLE } from '../styles';

// every style is imported by its folder, whichever one the build bundles
const MODULES = import.meta.glob('./*/index.jsx', { eager: true });

const SIZES = {
  landscape: [1920, 1080], portrait: [1080, 1920], square: [1080, 1080],
};

const [joke] = readJokes(exampleResult());
const draw = (module, props) => render(
  <I18nextProvider i18n={i18n}>
    <module.default joke={joke} revealed={false} {...props} />
  </I18nextProvider>,
);

afterEach(() => {
  cleanup();
  document.documentElement.style.fontSize = '';
  player.format = 'landscape';
  player.w = 1280;
  player.h = 720;
  i18n.changeLanguage('en');
});

describe('the styles of the package', () => {
  it('has a folder, a name and a description for each, all of one CMS type', () => {
    expect(CMS_TYPE).toBe('Jokes');
    expect(STYLES.map((s) => s.name)).toEqual(['Speech Bubbles', 'Game Show', 'Chat', 'Comic']);
    expect(STYLES.find((s) => s.id === DEFAULT_STYLE)).toBeTruthy();
    STYLES.forEach((style) => {
      expect(MODULES[`./${style.id}/index.jsx`], style.id).toBeTruthy();
      expect(style.description.length).toBeGreaterThan(20);
    });
    expect(new Set(STYLES.map((s) => s.id)).size).toBe(STYLES.length);
  });
});

STYLES.forEach(({ id }) => {
  describe(`style ${id}`, () => {
    const module = MODULES[`./${id}/index.jsx`];

    it('exports the fonts the app preloads', () => {
      expect(module.FONTS.length).toBeGreaterThan(0);
    });

    Object.entries(SIZES).forEach(([format, [w, h]]) => {
      it(`shows the question alone on a ${format} screen, on the ${format} plate`, () => {
        player.format = format;
        player.w = w;
        player.h = h;
        const { container } = draw(module, {});
        expect(screen.getByText(joke.setup)).toBeInTheDocument();
        expect(screen.queryByText(joke.punchline)).toBeNull();
        const plate = container.querySelector('.stage__plate');
        expect(plate.style.width).toBe(`${PLATES[format].w / 10}rem`);
        expect(plate.style.height).toBe(`${PLATES[format].h / 10}rem`);
        expect(document.documentElement.style.fontSize).toBe(`${Math.min(w / PLATES[format].w, h / PLATES[format].h) * 10}px`);
      });

      it(`reveals the answer and keeps the question on a ${format} screen`, () => {
        player.format = format;
        player.w = w;
        player.h = h;
        draw(module, { revealed: true });
        expect(screen.getByText(joke.punchline)).toBeInTheDocument();
        expect(screen.getAllByText(joke.setup).length).toBeGreaterThan(0);
      });
    });

    it('shrinks a very long question and a very long answer instead of letting them run over', () => {
      const normal = draw(module, { revealed: true });
      const normalSizes = [...normal.container.querySelectorAll('[style*="max-height"]')].map((node) => parseFloat(node.style.fontSize));
      cleanup();
      const longJoke = { ...joke, setup: `${joke.setup} `.repeat(14).trim(), punchline: `${joke.punchline} `.repeat(14).trim() };
      const long = draw(module, { joke: longJoke, revealed: true });
      const longNodes = [...long.container.querySelectorAll('[style*="max-height"]')];
      expect(longNodes.length).toBe(normalSizes.length);
      expect(longNodes.some((node, i) => parseFloat(node.style.fontSize) < normalSizes[i])).toBe(true);
      longNodes.forEach((node) => expect(node.style.overflow).toBe('hidden'));
    });

    it('speaks every language of the template', () => {
      ['en', 'pt', 'es', 'fr', 'de', 'it'].forEach((lng) => {
        i18n.changeLanguage(lng);
        [false, true].forEach((revealed) => {
          const { container, unmount } = draw(module, { revealed });
          expect(container.textContent).not.toMatch(/undefined|{{/);
          unmount();
        });
      });
    });
  });
});

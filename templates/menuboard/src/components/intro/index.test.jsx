import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, cleanup, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import Intro from '.';

afterEach(cleanup);

const renderIntro = () => render(<I18nextProvider i18n={i18n}><Intro /></I18nextProvider>);

describe('Intro', () => {
  it('draws a menu column with a flag and three priced products, announced as a status in the screen language', async () => {
    const { container } = renderIntro();
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
    expect(container.querySelectorAll('.intro__flag')).toHaveLength(1);
    expect(container.querySelectorAll('.intro__item')).toHaveLength(3);
    expect(container.querySelectorAll('.intro__price')).toHaveLength(3);
    await i18n.changeLanguage('pt');
    expect(screen.getByRole('status')).toHaveTextContent('Carregando');
    await i18n.changeLanguage('en');
  });

  it('says "Loading" in every language of the template', () => {
    ['en', 'pt', 'fr', 'es', 'de', 'nl', 'it'].forEach((lng) => {
      expect(i18n.getFixedT(lng)('Loading')).not.toBe('');
      expect(i18n.exists('Loading', { lng })).toBe(true);
    });
  });

  it('animates only HTML boxes: no SVG at all (the old WebViews cannot transform SVG)', () => {
    const { container } = renderIntro();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('keeps to what Android 4.4 WebViews run: no custom properties, no flex gap, and still when motion is not wanted', () => {
    const sass = readFileSync(resolve(import.meta.dirname, 'style.sass'), 'utf8');
    expect(sass).not.toMatch(/var\(--|^\s*--|\bgap\b/m);
    expect(sass).toMatch(/prefers-reduced-motion/);
  });
});

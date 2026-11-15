import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import Intro from '.';

afterEach(cleanup);

describe('Intro', () => {
  it('draws the zodiac wheel loader: twelve glyphs round a star, labelled for screen readers', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Intro /></I18nextProvider>);
    expect(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    expect(container.querySelectorAll('.intro__sign')).toHaveLength(12);
    expect(container.querySelector('.intro__core')).not.toBeNull();
    expect(container.querySelectorAll('.intro__twinkle').length).toBeGreaterThan(0);
  });

  it('animates only HTML boxes: no SVG element is styled or moved (the old WebViews cannot transform SVG)', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Intro /></I18nextProvider>);
    container.querySelectorAll('svg, svg *').forEach((node) => {
      expect(node.getAttribute('style')).toBeNull();
      expect(node.getAttribute('transform')).toBeNull();
      expect(node.tagName.toLowerCase()).not.toMatch(/^animate/);
    });
  });
});

import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, cleanup, screen } from '@testing-library/react';
import Intro from '.';

afterEach(cleanup);

const sass = readFileSync(resolve(import.meta.dirname, 'style.sass'), 'utf8');
const STYLES = ["next-holiday","month-calendar","long-weekend","holiday-poster","upcoming-list"];
const SHAPES = [[1920, 1080], [1080, 1920], [1080, 1080], [1920, 270], [270, 1920]];
// every style is imported by its folder, whichever one the build bundles
const LOADERS = import.meta.glob('../../styles/*/loader.js', { eager: true });
const loaderOf = (style) => LOADERS[`../../styles/${style}/loader.js`].default;

describe('Intro', () => {
  it('is one status with a label and no text at all, drawing the bundled style\'s mark', () => {
    const { container } = render(<Intro />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-label', 'Loading');
    expect(container.textContent).toBe('');
    expect(status.children.length).toBeGreaterThan(0);
    expect(status.style.backgroundColor).not.toBe('');
  });

  it('has a loader of its own in every style', () => {
    expect(Object.keys(LOADERS)).toHaveLength(STYLES.length);
    STYLES.forEach((style) => {
      const { mark, markSize, background } = loaderOf(style);
      expect(typeof mark).toBe('function');
      expect(typeof markSize).toBe('function');
      expect(background.color).toMatch(/^#[0-9a-f]{3,6}$/i);
    });
  });

  it('sizes the mark in whole px: 13 % of the short side, 42 % on a banner (3:1 or more)', () => {
    const { markSize } = loaderOf(STYLES[0]);
    expect(markSize(1920, 1080)).toBe(140);
    expect(markSize(1080, 1920)).toBe(140);
    expect(markSize(1080, 1080)).toBe(140);
    expect(markSize(1920, 641)).toBe(83);
    expect(markSize(1920, 640)).toBe(269);
    expect(markSize(1920, 270)).toBe(113);
    expect(markSize(270, 1920)).toBe(113);
  });

  it('draws whole pixels, no text and no SVG animation in every style at every screen shape', () => {
    STYLES.forEach((style) => {
      const { mark, markSize } = loaderOf(style);
      SHAPES.forEach(([w, h]) => {
        const html = mark(markSize(w, h));
        expect(html).not.toMatch(/\d\.\d+px|NaN|undefined/);
        const holder = document.createElement('div');
        holder.innerHTML = html;
        expect(holder.textContent).toBe('');
        holder.querySelectorAll('svg, svg *').forEach((node) => {
          expect(node.getAttribute('style')).toBeNull();
          expect(node.tagName.toLowerCase()).not.toMatch(/^(animate|animatetransform|set)/);
        });
      });
    });
  });

  it('prefixes what the old WebViews only know with -webkit-, and defines every keyframe a style uses (prefixed too)', () => {
    STYLES.forEach((style) => {
      const { mark, markSize } = loaderOf(style);
      const html = mark(markSize(1920, 1080));
      ['animation', 'transform', 'transform-origin'].forEach((property) => {
        const plain = html.match(new RegExp(`(?<![-\\w])${property}:`, 'g')) || [];
        const webkit = html.match(new RegExp(`-webkit-${property}:`, 'g')) || [];
        expect(plain.length).toBe(webkit.length);
      });
      const names = [...html.matchAll(/(?<!-webkit-)animation:(intro-[\w-]+)/g)].map((found) => found[1]);
      expect(names.length).toBeGreaterThan(0);
      names.forEach((name) => {
        expect(sass).toMatch(new RegExp(`^@keyframes ${name}$`, 'm'));
        expect(sass).toMatch(new RegExp(`^@-webkit-keyframes ${name}$`, 'm'));
      });
    });
  });

  it('keeps to what Android 4.4 WebViews run: no custom properties, no flex gap, and still when motion is not wanted', () => {
    expect(sass).toMatch(/position: absolute/);
    expect(sass).not.toMatch(/var\(--|^\s*--|\bgap\b|clamp\(|filter:/m);
    expect(sass).toMatch(/prefers-reduced-motion/);
  });
});

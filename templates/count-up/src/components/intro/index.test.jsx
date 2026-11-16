import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, cleanup, screen } from '@testing-library/react';
import Intro from '.';
import mark, { markSize } from './mark';

afterEach(cleanup);

const sass = readFileSync(resolve(import.meta.dirname, 'style.sass'), 'utf8');
const SHAPES = [[1920, 1080], [1080, 1920], [1080, 1080], [1920, 270], [270, 1920]];

describe('Intro', () => {
  it('is one status with a label and no words (only the single digit of the counting tile), drawing the mark', () => {
    const { container } = render(<Intro />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-label', 'Loading');
    expect(container.textContent.replace(/[0-3]/g, '')).toBe('');
    expect(container.textContent).not.toMatch(/[A-Za-z]/);
    expect(status.children.length).toBeGreaterThan(0);
  });

  it('sizes the mark in whole px: 13 % of the short side, 42 % on a banner (3:1 or more)', () => {
    expect(markSize(1920, 1080)).toBe(140);
    expect(markSize(1080, 1920)).toBe(140);
    expect(markSize(1080, 1080)).toBe(140);
    expect(markSize(1920, 641)).toBe(83);
    expect(markSize(1920, 640)).toBe(269);
    expect(markSize(1920, 270)).toBe(113);
    expect(markSize(270, 1920)).toBe(113);
  });

  it('draws whole pixels at every screen shape', () => {
    SHAPES.forEach(([w, h]) => {
      const html = mark(markSize(w, h));
      expect(html).not.toMatch(/\d\.\d+px/);
      expect(html).not.toMatch(/NaN|undefined/);
    });
  });

  it('draws no words and animates no SVG: SVG is a still layer without style, animate or set elements', () => {
    SHAPES.forEach(([w, h]) => {
      const holder = document.createElement('div');
      holder.innerHTML = mark(markSize(w, h));
      expect(holder.textContent.replace(/[0-3]/g, '')).toBe('');
      holder.querySelectorAll('svg, svg *').forEach((node) => {
        expect(node.getAttribute('style')).toBeNull();
        expect(node.tagName.toLowerCase()).not.toMatch(/^(animate|animatetransform|set)/);
      });
    });
  });

  it('prefixes what the old WebViews only know with -webkit-, and defines every keyframe it uses (prefixed too)', () => {
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

  it('keeps to what Android 4.4 WebViews run: its own background, no custom properties, no flex gap, and still when motion is not wanted', () => {
    expect(sass).toMatch(/^\s+background(-color)?:/m);
    expect(sass).not.toMatch(/var\(--|^\s*--|\bgap\b|clamp\(|filter:/m);
    expect(sass).toMatch(/prefers-reduced-motion/);
  });
});

import {
  describe, it, expect, afterEach, beforeEach, vi,
} from 'vitest';
import { render, cleanup } from '@testing-library/react';
import FittedText from '.';

// jsdom has no layout: a text is `em * 100` px wide and the box is `boxWidth` px.
let boxWidth = 200;
beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function scrollWidth() {
    return parseFloat(this.style.fontSize) * 100;
  });
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => boxWidth);
});

function sizeOf(props) {
  const { container } = render(<FittedText text="A name" max={3} min={1.2} {...props} />);
  return parseFloat(container.firstChild.style.fontSize);
}

describe('FittedText', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('keeps the biggest size when the text fits', () => {
    boxWidth = 500;
    expect(sizeOf({})).toBe(3);
  });

  it('shrinks to the biggest size that fits', () => {
    boxWidth = 200;
    const size = sizeOf({});
    expect(size).toBeLessThanOrEqual(2);
    expect(size).toBeGreaterThan(1.97);
  });

  it('never goes below the smallest size', () => {
    boxWidth = 50;
    expect(sizeOf({})).toBe(1.2);
  });

  it('stays on one line and cuts what does not fit', () => {
    boxWidth = 500;
    const { container } = render(<FittedText text="A name" max={3} min={1.2} className="user-name" />);
    const { style, className } = container.firstChild;
    expect([className, style.whiteSpace, style.overflow, style.textOverflow]).toEqual(['user-name', 'nowrap', 'hidden', 'ellipsis']);
  });
});

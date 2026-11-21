import { describe, it, expect } from 'vitest';
import { scaleOf } from './scale';

describe('scaleOf', () => {
  it('is 1 on the reference screen and for a strip', () => {
    expect(scaleOf('fmt-landscape', 1920, 1080)).toBe(1);
    expect(scaleOf('fmt-slim s81', 1920, 81)).toBe(1);
  });
  it('shrinks a half screen so its type fits', () => {
    expect(scaleOf('sf-landscape', 960, 540)).toBe(0.5);
    expect(scaleOf('sf-square', 960, 1080)).toBeCloseTo(0.889, 2);
  });
  it('grows on a bigger screen and follows the width on a banner', () => {
    expect(scaleOf('fmt-landscape', 3840, 2160)).toBe(2);
    expect(scaleOf('sf-band b4', 1280, 320)).toBeCloseTo(0.667, 2);
  });
});

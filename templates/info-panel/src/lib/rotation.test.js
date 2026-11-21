import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  dwellFor, locate, startStep, phasesOf, useRotation,
} from './rotation';

const LIMITS = { min: 3000, max: 8000 };

describe('dwellFor', () => {
  it('shares the media\'s duration among the phases', () => {
    expect(dwellFor(30000, 6, LIMITS)).toEqual({ dwell: 5000, fit: 6 });
  });

  it('never keeps an item longer than the maximum, however long the media is', () => {
    expect(dwellFor(120000, 3, LIMITS)).toEqual({ dwell: 8000, fit: 3 });
    expect(dwellFor(60000, 1, LIMITS).dwell).toBe(8000);
  });

  it('never makes an item shorter than the minimum, and says how many fit in one showing', () => {
    expect(dwellFor(20000, 11, LIMITS)).toEqual({ dwell: 3000, fit: 6 });
    expect(dwellFor(1000, 4, LIMITS)).toEqual({ dwell: 3000, fit: 1 });
  });

  it('takes 20 s when the media has no duration', () => {
    expect(dwellFor(undefined, 4, LIMITS)).toEqual({ dwell: 5000, fit: 4 });
    expect(dwellFor(0, 4, LIMITS)).toEqual({ dwell: 5000, fit: 4 });
  });
});

describe('locate and startStep', () => {
  it('walks the phases: a joke is one item with two', () => {
    const phases = phasesOf([1, 2, 1]);
    expect([0, 1, 2, 3].map((s) => locate(s, phases))).toEqual([
      { active: 0, phase: 0 }, { active: 1, phase: 0 }, { active: 1, phase: 1 }, { active: 2, phase: 0 },
    ]);
  });

  it('starts each showing where the last one stopped, so every item is seen in the end', () => {
    expect([0, 1, 2, 3, 4].map((i) => startStep(i, 6, 11))).toEqual([0, 6, 1, 7, 2]);
    expect(startStep(7, 1, 1)).toBe(0);
  });
});

describe('useRotation', () => {
  afterEach(() => vi.useRealTimers());

  it('moves to the next item every dwell and goes round', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRotation({ phases: [1, 2, 1], duration: 12000, iteration: 0, ...LIMITS }));
    expect(result.current).toEqual({ active: 0, phase: 0 });
    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current).toEqual({ active: 1, phase: 0 });
    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current).toEqual({ active: 1, phase: 1 });
    act(() => { vi.advanceTimersByTime(6000); });
    expect(result.current).toEqual({ active: 0, phase: 0 });
  });

  it('keeps the first item and sets no timer when there is nothing to rotate', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRotation({ phases: [1], duration: 12000, iteration: 3, ...LIMITS }));
    act(() => { vi.advanceTimersByTime(60000); });
    expect(result.current).toEqual({ active: 0, phase: 0 });
    expect(vi.getTimerCount()).toBe(0);
  });

  it('starts a later showing on a later item when the media is too short for a whole turn', () => {
    const { result } = renderHook(() => useRotation({ phases: [1, 1, 1, 1, 1, 1], duration: 6000, iteration: 1, ...LIMITS }));
    expect(result.current).toEqual({ active: 2, phase: 0 });
  });
});

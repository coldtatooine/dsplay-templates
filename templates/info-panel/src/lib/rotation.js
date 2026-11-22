// How long each item of a rotating area stays, and which one is showing. Pure functions (tested in rotation.test.js) and the hook that runs them.
//
// The media's duration is shared among the items, but a long media must not keep the screen on one item: the time of an item is `duration / phases`, never more than `max`
// and never less than `min` (shorter than that it cannot be read). A joke has two phases (the question, then the answer), a news item or a counter has one. When the media is
// shorter than a whole turn of the items (the minimum times the phases), the turn does not fit in one showing: each showing then picks up where the previous one stopped
// (`iteration` counts the showings), so every item is seen in the end.

import { useEffect, useMemo, useState } from 'react';

const DEFAULT_DURATION = 20000;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** The phases of every item in one list, as whole numbers of at least 1. */
export const phasesOf = (items) => items.map((item) => Math.max(1, Math.trunc(Number(item) || 1)));

/**
 * The time of one phase, in ms, and how many phases a showing of this media can hold.
 * @param {number} duration the media's duration, ms (the default is 20 s when it is unknown)
 * @param {number} total phases in one turn of the items
 * @param {{min: number, max: number}} limits ms
 */
export function dwellFor(duration, total, { min, max }) {
  const length = Number(duration) > 0 ? Number(duration) : DEFAULT_DURATION;
  const dwell = clamp(length / Math.max(1, total), min, max);
  const fit = clamp(Math.floor(length / dwell), 1, Math.max(1, total));
  return { dwell: Math.round(dwell), fit };
}

/** Which item, and which of its phases, a step of the turn is on. */
export function locate(step, phases) {
  let left = step;
  for (let index = 0; index < phases.length; index += 1) {
    if (left < phases[index]) return { active: index, phase: left };
    left -= phases[index];
  }
  return { active: 0, phase: 0 };
}

/**
 * The step a showing starts on. A showing holds whole items only, as many as fit in `fit` phases (at least one), so it never ends between the question of a joke and its answer; the next
 * showing starts at the item after the last one. The start of showing `iteration` is found by playing the showings before it (the place repeats, so a long count is reduced).
 */
export function startStep(iteration, fit, phases) {
  const count = Math.abs(Math.trunc(Number(iteration) || 0));
  const items = phases.length;
  if (!items || !count) return 0;
  const next = (from) => {
    let index = from;
    let used = 0;
    for (let taken = 0; taken < items; taken += 1) {
      if (taken > 0 && used + phases[index] > fit) break;
      used += phases[index];
      index = (index + 1) % items;
    }
    return index;
  };
  const seen = new Map();
  let index = 0;
  for (let shown = 0; shown < count; shown += 1) {
    if (seen.has(index)) {
      // the same item starts the showing again: from here the places repeat with this period
      const period = shown - seen.get(index);
      for (let left = (count - shown) % period; left > 0; left -= 1) index = next(index);
      break;
    }
    seen.set(index, shown);
    index = next(index);
  }
  return phases.slice(0, index).reduce((sum, n) => sum + n, 0);
}

/**
 * The item showing now and its phase. With nothing to rotate (one phase) it stays on the first item and sets no timer.
 * @param {{phases: number[], duration: number, iteration: number, min: number, max: number}} options
 */
export function useRotation({ phases, duration, iteration, min, max }) {
  const key = phases.join(',');
  const list = useMemo(() => phasesOf(key ? key.split(',').map(Number) : []), [key]);
  const total = list.reduce((sum, n) => sum + n, 0);
  const { dwell, fit } = dwellFor(duration, total, { min, max });
  const first = startStep(iteration, fit, list);
  const [step, setStep] = useState(first);

  useEffect(() => {
    // a new showing (or a changed duration) restarts the rotation on its own first step
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(first);
    if (total <= 1) return undefined;
    const timer = setInterval(() => setStep((s) => (s + 1) % total), dwell);
    return () => clearInterval(timer);
  }, [first, dwell, total]);

  return locate(step % Math.max(1, total), list);
}

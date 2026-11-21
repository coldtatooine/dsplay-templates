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

/** The step a showing starts on: the previous showings are over, each of them held `fit` steps. */
export const startStep = (iteration, fit, total) => ((Math.abs(Math.trunc(Number(iteration) || 0)) * fit) % Math.max(1, total));

/**
 * The item showing now and its phase. With nothing to rotate (one phase) it stays on the first item and sets no timer.
 * @param {{phases: number[], duration: number, iteration: number, min: number, max: number}} options
 */
export function useRotation({ phases, duration, iteration, min, max }) {
  const key = phases.join(',');
  const list = useMemo(() => phasesOf(key ? key.split(',').map(Number) : []), [key]);
  const total = list.reduce((sum, n) => sum + n, 0);
  const { dwell, fit } = dwellFor(duration, total, { min, max });
  const first = startStep(iteration, fit, total);
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

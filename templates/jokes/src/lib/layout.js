// Pure layout: which design plate a screen gets and how big a text can be so that it fits its box, whatever its length.
//
// A style is drawn on a fixed plate (1280 x 720 landscape, 720 x 1280 portrait, 900 x 900 square), in "design pixels" (1 design px = 0.1rem; the Stage sets the
// root font size so that the plate fits the screen). A screen of another shape gets bars of the style's background around the plate.

export const PLATES = {
  landscape: { kind: 'landscape', w: 1280, h: 720 },
  portrait: { kind: 'portrait', w: 720, h: 1280 },
  square: { kind: 'square', w: 900, h: 900 },
};

/** The plate of a screen format ("landscape", "portrait", "square", "h-banner", "v-banner"); the banners take the landscape and portrait plates. */
export function plateOf(screenFormat) {
  if (screenFormat === 'portrait' || screenFormat === 'v-banner') return PLATES.portrait;
  if (screenFormat === 'square') return PLATES.square;
  return PLATES.landscape;
}

/** How many real pixels one design pixel is on a screen of `width` x `height`. */
export const scaleOf = (plate, width, height) => Math.min(width / plate.w, height / plate.h);

/** Design pixels to rem (the root font size is 10 real pixels per design pixel of scale, see Stage). */
export const rem = (designPx) => `${Math.round(designPx * 100) / 1000}rem`;

/** How many lines a text takes in a box `width` wide at `size`, breaking at spaces; `charWidth` is the average width of a character in em. */
export function countLines(text, width, size, charWidth) {
  const perLine = Math.max(1, Math.floor(width / (size * charWidth)));
  let lines = 1;
  let used = 0;
  String(text).split(/\s+/).filter(Boolean).forEach((word) => {
    // a word longer than a line is cut into lines
    if (word.length > perLine) {
      if (used > 0) lines += 1;
      lines += Math.ceil(word.length / perLine) - 1;
      used = word.length % perLine || perLine;
      return;
    }
    if (used === 0) used = word.length;
    else if (used + 1 + word.length <= perLine) used += 1 + word.length;
    else { lines += 1; used = word.length; }
  });
  return lines;
}

/**
 * The biggest font size, from `max` down to `min` in steps of 1, at which `text` fits a box `width` x `height` (design px). The estimate keeps a margin
 * (SAFETY of the width) because a font's real widths are never the average. At `min` it returns `min`: the box then clips (see FittedText).
 */
const SAFETY = 0.94;
export function fitFont({
  text, width, height, max, min, lineHeight = 1.4, charWidth = 0.52,
}) {
  for (let size = max; size > min; size -= 1) {
    if (countLines(text, width * SAFETY, size, charWidth) * size * lineHeight <= height) return size;
  }
  return min;
}

/** The biggest size, from `max` down to `min`, at which `text` fits on one line `width` wide (a title). */
export function fitLine({
  text, width, max, min, charWidth = 0.55,
}) {
  const length = Math.max(1, String(text).length);
  return Math.max(min, Math.min(max, Math.floor((width * SAFETY) / (length * charWidth))));
}

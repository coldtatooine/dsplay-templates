// Which of the panel's formats a screen is, from its width and height. The sizes of every format are em of the root font-size the format sets (see style.sass), so the
// format alone decides how the widgets look: a strip, a banner, a tile layout or a tall column.
//
//   slim      a strip 14 times longer than tall or more (1920x120 is today's bar, 1920x81 a footer region, 1920x56 a thin bar); `s120`/`s81`/`s56` pick its type size
//   band      a horizontal banner from 4:1 to 14:1 (1920x240 is 8:1)
//   landscape, square, portrait   the widgets as translucent tiles
//   tall      a vertical banner 3 times taller than wide or more (320x1080)

/** The format class of a screen of `width` x `height` pixels. */
export function formatOf(width, height) {
  const w = Number(width) > 0 ? Number(width) : 1920;
  const h = Number(height) > 0 ? Number(height) : 1080;
  const ratio = w / h;
  if (ratio >= 14) {
    // the type size follows the height of the strip, in the steps the design sets
    const size = h >= 100 ? 's120' : h >= 70 ? 's81' : 's56';
    return `fmt-slim ${size}`;
  }
  if (ratio >= 4) return 'fmt-band';
  if (ratio >= 1.2) return 'fmt-landscape';
  if (ratio >= 0.85) return 'fmt-square';
  if (ratio > 1 / 3) return 'fmt-portrait';
  return 'fmt-tall';
}

/** True for the formats that lay the widgets out in one list (the strips and the two banners), false for the ones that group them in tiles. */
export const isFlat = (format) => /fmt-(slim|band|tall)/.test(format);

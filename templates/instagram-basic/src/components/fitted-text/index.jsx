import { useLayoutEffect, useRef, useState } from 'react';

// the search stops when the two sizes are this close, in em
const PRECISION = 0.02;
// when to measure again, in ms, on a WebView that cannot say when a font has arrived (Android 4.4 has no `document.fonts`)
const REMEASURE_AFTER = [300, 1000, 2500];

/**
 * A text on one line that takes the space it needs and no more: the font size is the biggest, from `max` down to `min` (in em, of the parent's font size), at which the
 * text, measured as the browser draws it, fits the width its parent gives it. It measures the real element before the first paint, so a long name never wraps over the
 * text below it, and again once the fonts are in (the Loader mounts the template hidden while they load, and a text measured in the fallback font would be cut, or too
 * small, when the real one arrives). If even `min` is too much the text is cut with an ellipsis. The shared `FitText` fills a fixed box with no biggest or smallest size,
 * so it would blow a short name up to the whole box. The same idea as the Holidays template's `FittedText`, in em instead of its design pixels.
 */
function FittedText({
  as: Tag = 'span', text, max, min, className = '', style = {},
}) {
  const ref = useRef(null);
  const [size, setSize] = useState(max);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // the text fits when nothing sticks out sideways of the box the parent gives it
    const fits = (candidate) => {
      el.style.fontSize = `${candidate}em`;
      return el.scrollWidth <= el.clientWidth;
    };
    const fit = () => {
      let best = min;
      if (fits(max)) best = max;
      else {
        let low = min;
        let high = max;
        while (high - low > PRECISION) {
          const middle = (low + high) / 2;
          if (fits(middle)) { best = middle; low = middle; } else high = middle;
        }
      }
      el.style.fontSize = `${best}em`;
      setSize(best);
    };

    fit();
    let live = true;
    const again = () => { if (live) fit(); };
    const { fonts } = document;
    if (fonts && fonts.ready) fonts.ready.then(again, () => {});
    if (fonts && fonts.addEventListener) fonts.addEventListener('loadingdone', again);
    const timers = REMEASURE_AFTER.map((ms) => setTimeout(again, ms));
    return () => {
      live = false;
      timers.forEach(clearTimeout);
      if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', again);
    };
  }, [text, max, min]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'block',
        fontSize: `${size}em`,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </Tag>
  );
}

export default FittedText;

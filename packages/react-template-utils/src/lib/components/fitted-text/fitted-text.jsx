import React, { useLayoutEffect, useRef, useState } from 'react';

// the search stops when the two sizes are this close, in em
const PRECISION = 0.02;
// when to measure again, in ms, on a WebView that cannot say when a font has arrived (Android 4.4 has no `document.fonts`)
const REMEASURE_AFTER = [300, 1000, 2500];

/**
 * A text on one line that takes the space it needs and no more: the font size is the biggest, from `max` down to `min`, at which the text, measured as the browser
 * draws it, fits the width its parent gives it. It measures the real element before the first paint, so a long name never wraps over the text below it, and again
 * once the fonts are in (`Loader` mounts the template hidden while they load, and a text measured in the fallback font would be cut, or too small, when the real
 * one arrives). If even `min` is too much the text is cut with an ellipsis. A short text keeps `max`.
 *
 * It differs from `FitText`, which fills a fixed box with no biggest or smallest size and so would blow a short text up to the whole box. The element is a block
 * as wide as its parent leaves it: give the parent the width the text may use.
 * @param {object} props
 * @param {string} props.text - The text, one line
 * @param {number} props.max - Biggest font size, in em of the parent's font size (the size a short text gets)
 * @param {number} props.min - Smallest font size, in em of the parent's font size
 * @param {string} [props.as] - Tag of the element, `span` by default
 * @param {string} [props.className] - Class applied to the element
 * @param {React.CSSProperties} [props.style] - Extra styles merged into the element (the size and the one-line rules always win)
 * @returns {React.ReactElement}
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

import { useMemo } from 'react';
import { useScreenInfo } from '@dsplay/react-template-utils';
import { LOADER } from '@style';
import './style.sass';

// The loader is the style's own: one small mark centred on the style's background, with no text (src/styles/<style>/loader.js).
// Only HTML boxes are animated (a still SVG sits inside a box where a logo is needed): old Android WebViews cannot transform SVG.

function Intro(props) {
  const { w, h } = useScreenInfo();
  const html = useMemo(() => LOADER.mark(LOADER.markSize(w, h)), [w, h]);
  const { className } = props;

  return (
    <div
      {...props}
      className={`intro ${className || ''}`}
      role="status"
      aria-label="Loading"
      style={{ backgroundColor: LOADER.background.color, backgroundImage: LOADER.background.image }}
      // the markup is drawn by the style's loader from numbers only, never from data
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Intro;

import { useMemo } from 'react';
import { useScreenInfo } from '@dsplay/react-template-utils';
import mark, { markSize } from './mark';
import './style.sass';

// The loader is one small mark centred on the template's own background, with no text.
// Only HTML boxes are animated (a still SVG sits inside a box where a logo is needed): old Android WebViews cannot transform SVG.

function Intro(props) {
  const { w, h } = useScreenInfo();
  const html = useMemo(() => mark(markSize(w, h)), [w, h]);
  const { className } = props;

  return (
    <div
      {...props}
      className={`intro ${className || ''}`}
      role="status"
      aria-label="Loading"
      // the markup is drawn by ./mark from numbers only, never from data
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Intro;

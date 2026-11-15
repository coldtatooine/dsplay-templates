import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: the feed symbol, whose waves go out one after the other.
// The two hidden lines make the browser load the template's fonts while it waits.

function Intro(props) {
  const { w, h, screenFormat } = useScreenInfo();

  const dimension = useMemo(() => {
    const smaller = Math.min(w, h);
    return screenFormat === screen.H_BANNER || screenFormat === screen.V_BANNER ? smaller / 2 : smaller / 6;
  }, [w, h, screenFormat]);

  return (
    <div {...props} className="loader">
      <svg className="intro__icon" viewBox="0 0 120 120" width={dimension} height={dimension} aria-hidden="true" focusable="false">
        <circle cx="34" cy="86" r="9" fill="#f78422" />
        <path className="intro__wave intro__wave--1" d="M25 52a43 43 0 0 1 43 43" fill="none" stroke="#f78422" strokeWidth="11" strokeLinecap="round" />
        <path className="intro__wave intro__wave--2" d="M25 22a73 73 0 0 1 73 73" fill="none" stroke="#f78422" strokeWidth="11" strokeLinecap="round" />
      </svg>
      <div className="hidden" style={{ fontFamily: 'Oswald' }}>Loading</div>
      <div className="hidden" style={{ fontFamily: 'Roboto Condensed' }}>Loading</div>
    </div>
  );
}

export default Intro;

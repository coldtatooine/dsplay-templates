import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a globe turning, with the hand of a clock going round it.

function Intro(props) {
  const { w, h, screenFormat } = useScreenInfo();

  const dimension = useMemo(() => {
    const smaller = Math.min(w, h);
    return screenFormat === screen.H_BANNER || screenFormat === screen.V_BANNER ? smaller / 2 : smaller / 6;
  }, [w, h, screenFormat]);

  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`}>
      <svg className="intro__icon" viewBox="0 0 120 120" width={dimension} height={dimension} aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r="40" fill="rgba(0, 0, 0, 0.35)" stroke="#f2f4f7" strokeWidth="5" />
        <path d="M22 44h76M22 76h76M60 20v80" fill="none" stroke="#4dd0e1" strokeWidth="2.5" />
        <ellipse className="intro__meridian intro__meridian--1" cx="60" cy="60" rx="26" ry="40" fill="none" stroke="#4dd0e1" strokeWidth="2.5" />
        <ellipse className="intro__meridian intro__meridian--2" cx="60" cy="60" rx="26" ry="40" fill="none" stroke="#4dd0e1" strokeWidth="2.5" />
        <line className="intro__hand" x1="60" y1="60" x2="60" y2="14" stroke="#ffb300" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="60" r="4.5" fill="#f2f4f7" />
      </svg>
    </div>
  );
}

export default Intro;

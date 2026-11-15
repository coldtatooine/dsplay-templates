import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a plate with a fork and a knife and the steam of a hot dish.

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
        <circle cx="60" cy="72" r="34" fill="#1b2430" stroke="#e8edf4" strokeWidth="4" />
        <circle cx="60" cy="72" r="22" fill="none" stroke="#2b3441" strokeWidth="3" />
        <path d="M20 52v26M16 52v14a4 4 0 0 0 8 0V52M20 78v22" fill="none" stroke="#ffb74d" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 52c-6 6-6 20 0 26M100 52v48" fill="none" stroke="#ffb74d" strokeWidth="3" strokeLinecap="round" />
        <path className="intro__steam intro__steam--1" d="M46 36c-6-6 6-10 0-18" fill="none" stroke="#e8edf4" strokeWidth="3" strokeLinecap="round" />
        <path className="intro__steam intro__steam--2" d="M60 34c-6-6 6-10 0-18" fill="none" stroke="#e8edf4" strokeWidth="3" strokeLinecap="round" />
        <path className="intro__steam intro__steam--3" d="M74 36c-6-6 6-10 0-18" fill="none" stroke="#e8edf4" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default Intro;

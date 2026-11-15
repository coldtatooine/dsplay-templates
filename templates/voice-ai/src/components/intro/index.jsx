import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: the bars of a voice, rising and falling as someone speaks.

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
        <defs>
          <linearGradient id="intro-voice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#18ffff" />
            <stop offset="1" stopColor="#7c4dff" />
          </linearGradient>
        </defs>
        <rect className="intro__bar intro__bar--1" x="22" y="42" width="10" height="36" rx="5" fill="url(#intro-voice)" />
        <rect className="intro__bar intro__bar--2" x="40" y="26" width="10" height="68" rx="5" fill="url(#intro-voice)" />
        <rect className="intro__bar intro__bar--3" x="58" y="14" width="10" height="92" rx="5" fill="url(#intro-voice)" />
        <rect className="intro__bar intro__bar--4" x="76" y="30" width="10" height="60" rx="5" fill="url(#intro-voice)" />
        <rect className="intro__bar intro__bar--5" x="94" y="46" width="10" height="28" rx="5" fill="url(#intro-voice)" />
      </svg>
    </div>
  );
}

export default Intro;

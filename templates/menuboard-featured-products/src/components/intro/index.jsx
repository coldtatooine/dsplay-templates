import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a cloche that lifts to show the dish of the day, a star.

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
        <path className="intro__star" d="M60 46l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#ffd54f" />
        <g className="intro__lid">
          <path d="M22 84a38 38 0 0 1 76 0z" fill="#e8edf4" />
          <circle cx="60" cy="42" r="6" fill="#e8edf4" />
        </g>
        <rect x="14" y="88" width="92" height="8" rx="4" fill="#ff6f61" />
      </svg>
    </div>
  );
}

export default Intro;

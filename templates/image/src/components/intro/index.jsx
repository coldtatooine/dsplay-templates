import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a picture frame, with a sun and mountains, that a band of light sweeps across.

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
          <clipPath id="intro-frame"><rect x="14" y="26" width="92" height="68" rx="6" /></clipPath>
          <linearGradient id="intro-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="14" y="26" width="92" height="68" rx="6" fill="#1b2430" />
        <circle className="intro__sun" cx="38" cy="48" r="9" fill="#ffd54f" />
        <path d="M14 94l30-32 20 20 14-14 28 26z" fill="#4a5a70" clipPath="url(#intro-frame)" />
        <rect className="intro__sweep" x="-30" y="20" width="26" height="80" fill="url(#intro-shine)" clipPath="url(#intro-frame)" transform="skewX(-20)" />
        <rect x="14" y="26" width="92" height="68" rx="6" fill="none" stroke="#e8edf4" strokeWidth="4" />
      </svg>
    </div>
  );
}

export default Intro;

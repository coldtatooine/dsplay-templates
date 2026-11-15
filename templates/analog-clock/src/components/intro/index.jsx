import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a clock face whose hands go round.

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
        <circle cx="60" cy="60" r="46" fill="rgba(0, 0, 0, 0.35)" stroke="#f2f4f7" strokeWidth="5" />
        <path d="M60 20v6M60 94v6M20 60h6M94 60h6" stroke="#f2f4f7" strokeWidth="4" strokeLinecap="round" />
        <line className="intro__hour" x1="60" y1="60" x2="60" y2="38" stroke="#f2f4f7" strokeWidth="5" strokeLinecap="round" />
        <line className="intro__minute" x1="60" y1="60" x2="60" y2="28" stroke="#ffb300" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="60" r="4.5" fill="#f2f4f7" />
      </svg>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: three photos fanned like a collage, each lifting in turn.

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
        <g className="intro__photo intro__photo--1" transform="rotate(-14 60 64)">
          <rect x="30" y="26" width="52" height="64" rx="4" fill="#f2f4f7" />
          <rect x="35" y="31" width="42" height="40" rx="2" fill="#4dd0e1" />
        </g>
        <g className="intro__photo intro__photo--2" transform="rotate(12 60 64)">
          <rect x="38" y="30" width="52" height="64" rx="4" fill="#f2f4f7" />
          <rect x="43" y="35" width="42" height="40" rx="2" fill="#f06292" />
        </g>
        <g className="intro__photo intro__photo--3">
          <rect x="34" y="28" width="52" height="64" rx="4" fill="#f2f4f7" />
          <rect x="39" y="33" width="42" height="40" rx="2" fill="#ffb74d" />
          <circle cx="52" cy="46" r="5" fill="#fff3c4" />
          <path d="M39 73l14-14 10 10 6-6 12 10z" fill="#8d5524" />
        </g>
      </svg>
    </div>
  );
}

export default Intro;

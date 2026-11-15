import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: two waves rolling under the moon, the thing that pulls the tide.

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
          <clipPath id="intro-sea"><circle cx="60" cy="66" r="40" /></clipPath>
        </defs>
        <circle cx="60" cy="66" r="42" fill="none" stroke="#9ad0ff" strokeWidth="3" />
        <g clipPath="url(#intro-sea)">
          <path className="intro__wave intro__wave--back" d="M-40 66q10-10 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0v50h-200z" fill="#5fb4ff" fillOpacity="0.55" />
          <path className="intro__wave intro__wave--front" d="M-40 76q10-10 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0v50h-200z" fill="#9ad0ff" />
        </g>
        <path className="intro__moon" d="M96 14a14 14 0 1 0 10 22 11 11 0 0 1-10-22z" fill="#ffe9a8" />
      </svg>
    </div>
  );
}

export default Intro;

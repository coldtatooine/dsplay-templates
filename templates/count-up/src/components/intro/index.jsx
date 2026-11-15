import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a stopwatch whose hand goes round while its ring fills.

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
        <rect x="52" y="12" width="16" height="9" rx="2" fill="#e8edf4" />
        <line x1="60" y1="21" x2="60" y2="27" stroke="#e8edf4" strokeWidth="4" />
        <circle cx="60" cy="68" r="38" fill="none" stroke="#2b3441" strokeWidth="6" />
        <circle className="intro__ring" cx="60" cy="68" r="38" fill="none" stroke="#4cc38a" strokeWidth="6" strokeLinecap="round" strokeDasharray="239" transform="rotate(-90 60 68)" />
        <line className="intro__hand" x1="60" y1="68" x2="60" y2="42" stroke="#e8edf4" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="68" r="4.5" fill="#e8edf4" />
      </svg>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a QR code that is being scanned, with the arcs of a wireless signal above it.

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
        <path className="intro__arc intro__arc--1" d="M44 24a22 22 0 0 1 32 0" fill="none" stroke="#4dd0e1" strokeWidth="5" strokeLinecap="round" />
        <path className="intro__arc intro__arc--2" d="M51 31a12 12 0 0 1 18 0" fill="none" stroke="#4dd0e1" strokeWidth="5" strokeLinecap="round" />
        <circle className="intro__arc intro__arc--3" cx="60" cy="38" r="3.5" fill="#4dd0e1" />
        <path d="M22 44h20v20H22zM78 44h20v20H78zM22 100h20v-20H22z" fill="none" stroke="#f2f4f7" strokeWidth="5" strokeLinejoin="round" />
        <rect className="intro__cell intro__cell--1" x="42" y="36" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--2" x="62" y="46" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--3" x="22" y="66" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--4" x="52" y="66" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--1" x="72" y="76" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--2" x="62" y="86" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--3" x="82" y="66" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--4" x="42" y="96" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--1" x="82" y="96" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--2" x="72" y="56" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--3" x="52" y="86" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__cell intro__cell--4" x="62" y="96" width="7" height="7" fill="#f2f4f7" />
        <rect className="intro__scan" x="18" y="46" width="84" height="3.5" rx="1.75" fill="#4cc38a" />
      </svg>
    </div>
  );
}

export default Intro;

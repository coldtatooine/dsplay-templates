import { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: an hourglass whose sand runs down and starts again.

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
        <path d="M30 12h60M30 108h60" stroke="#e8edf4" strokeWidth="5" strokeLinecap="round" />
        <path d="M38 12c0 32 18 42 22 48-4 6-22 16-22 48M82 12c0 32-18 42-22 48 4 6 22 16 22 48" fill="none" stroke="#e8edf4" strokeWidth="4" strokeLinecap="round" />
        <path className="intro__sand-top" d="M42 18h36c-2 18-12 30-18 36-6-6-16-18-18-36z" fill="#ffb300" />
        <path className="intro__sand-bottom" d="M42 102h36c-2-10-8-18-18-24-10 6-16 14-18 24z" fill="#ffb300" />
        <line className="intro__stream" x1="60" y1="56" x2="60" y2="100" stroke="#ffb300" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}

export default Intro;

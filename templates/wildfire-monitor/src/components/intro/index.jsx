import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the media is about: a flame that flickers while two sparks rise from it one after the other.

function Intro(props) {
  const { w, h, screenFormat } = useScreenInfo();
  const { t } = useTranslation();

  const dimension = useMemo(() => {
    const smaller = Math.min(w, h);
    return screenFormat === screen.H_BANNER || screenFormat === screen.V_BANNER ? smaller / 3 : smaller / 6;
  }, [w, h, screenFormat]);

  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`}>
      <svg className="intro__icon" viewBox="0 0 120 120" width={dimension} height={dimension} role="img" aria-label={t('Loading')}>
        <g className="intro__flame">
          <path
            d="M60 12c4 20 24 30 24 56a24 24 0 0 1-48 0c0-12 6-18 10-26 2 8 6 10 8 10 4-10 0-24 6-40z"
            fill="#ff6a00"
          />
          <path
            d="M60 50c2 10 12 14 12 26a12 12 0 0 1-24 0c0-6 4-9 6-13 2 4 4 5 5 5 2-5 0-12 1-18z"
            fill="#ffb300"
          />
        </g>
        <circle className="intro__spark intro__spark--1" cx="40" cy="30" r="3" fill="#ffb300" />
        <circle className="intro__spark intro__spark--2" cx="82" cy="34" r="2.5" fill="#ff6a00" />
      </svg>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the media is about: a cloud that rocks gently while three raindrops fall from it one after the other.

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
        <g className="intro__cloud">
          <path
            d="M34 70a18 18 0 0 1 3-35.7A26 26 0 0 1 87 38a16 16 0 0 1 1 32z"
            fill="#7ba3c8"
          />
          <path
            d="M34 70a18 18 0 0 1 3-35.7A26 26 0 0 1 87 38a16 16 0 0 1 1 32z"
            fill="none"
            stroke="#e8f4fd"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
        <path className="intro__drop intro__drop--1" d="M42 80c0 0-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11z" fill="#29b6f6" />
        <path className="intro__drop intro__drop--2" d="M62 80c0 0-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11z" fill="#29b6f6" />
        <path className="intro__drop intro__drop--3" d="M82 80c0 0-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11z" fill="#29b6f6" />
      </svg>
    </div>
  );
}

export default Intro;

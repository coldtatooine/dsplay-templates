import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own timer: the dark digit tiles, and the last one counting down to zero over and over.
// Only HTML boxes are animated (steps of a strip of digits, a blinking colon): the old Android WebViews cannot transform SVG.

const REEL = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the font size of the timer; everything inside is in em, like the template's own units
  const size = useMemo(() => Math.round(Math.min(w * 0.09, h * 0.24)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__timer" style={{ fontSize: `${size}px` }}>
        <div className="intro__digits">
          <span className="intro__digit">0</span>
          <span className="intro__digit">0</span>
        </div>
        <span className="intro__colon">:</span>
        <div className="intro__digits">
          <span className="intro__digit">0</span>
          <span className="intro__digit intro__digit--reel">
            <span className="intro__strip">
              {REEL.map((digit) => <span key={digit} className="intro__number">{digit}</span>)}
            </span>
          </span>
        </div>
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.22}px`, marginTop: `${size * 0.45}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

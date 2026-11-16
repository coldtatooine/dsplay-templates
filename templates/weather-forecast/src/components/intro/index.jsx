import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own weather: the clear-sky gradient of its main panel, the sun with its rays slowly
// turning and a white cloud drifting in front of it.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of the sky; everything inside is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.05, h * 0.05)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__sky" style={{ fontSize: `${size}px` }} aria-hidden="true">
        <div className="intro__sun">
          <div className="intro__rays">
            {RAYS.map((angle) => (
              <span key={angle} className="intro__ray-holder" style={{ WebkitTransform: `rotate(${angle}deg)`, transform: `rotate(${angle}deg)` }}>
                <span className="intro__ray" />
              </span>
            ))}
          </div>
          <span className="intro__core" />
        </div>
        <div className="intro__cloud">
          <span className="intro__puff intro__puff--left" />
          <span className="intro__puff intro__puff--right" />
          <span className="intro__base" />
        </div>
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.7}px`, marginTop: `${size * 0.7}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

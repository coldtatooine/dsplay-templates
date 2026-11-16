import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a photo in its white frame, on the template's own purple to coral,
// getting a like: a heart, drawn with three boxes, beats over it. Only HTML boxes are animated: the old Android
// WebViews cannot transform SVG.

const px = (value) => `${Math.round(value)}px`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  const frame = Math.round(size * 1.3);
  const border = Math.round(size * 0.06);
  // the heart is a square turned 45 degrees with a circle on each of its two upper sides
  const heart = Math.round(size * 0.46);
  const side = Math.round(heart * 0.6);

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__frame" style={{ width: px(frame), height: px(frame), padding: px(border), borderRadius: px(size * 0.05) }}>
        <span className="intro__photo">
          <span className="intro__shine" />
        </span>
        <span className="intro__heart" style={{ width: px(heart), height: px(heart), left: px((frame - heart) / 2), top: px((frame - heart) / 2 - border * 0.3) }}>
          <span className="intro__heart-part" style={{ width: px(side), height: px(side), left: px(heart * 0.2), top: px(heart * 0.28), borderRadius: px(side * 0.08), WebkitTransform: 'rotate(45deg)', transform: 'rotate(45deg)' }} />
          <span className="intro__heart-part" style={{ width: px(side), height: px(side), left: px(-heart * 0.012), top: px(heart * 0.068), borderRadius: '50%' }} />
          <span className="intro__heart-part" style={{ width: px(side), height: px(side), left: px(heart * 0.412), top: px(heart * 0.068), borderRadius: '50%' }} />
        </span>
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(12, size * 0.11)), marginTop: px(size * 0.16) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

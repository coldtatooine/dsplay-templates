import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: three photos fanned like a collage, each lifting in turn.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG. Each photo is two boxes: the
// one that is turned (still) and the one inside it that lifts.

const PHOTOS = [
  { name: 'cyan', angle: -14, shift: -0.34 },
  { name: 'pink', angle: 12, shift: 0.34 },
  { name: 'orange', angle: 0, shift: 0 },
];

const px = (value) => `${Math.round(value)}px`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  const width = Math.round(size * 0.7);
  const height = Math.round(size * 0.88);
  const border = Math.round(size * 0.05);

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__collage" style={{ width: px(size * 1.6), height: px(height * 1.12) }}>
        {PHOTOS.map(({ name, angle, shift }, index) => (
          <span
            key={name}
            className="intro__turn"
            style={{
              width: px(width),
              height: px(height),
              left: px((size * 1.6 - width) / 2 + shift * size),
              top: px(height * 0.06),
              WebkitTransform: `rotate(${angle}deg)`,
              transform: `rotate(${angle}deg)`,
            }}
          >
            <span
              className="intro__photo"
              style={{
                padding: px(border), paddingBottom: px(border * 3), borderRadius: px(size * 0.04), animationDelay: `${index * 0.8}s`, WebkitAnimationDelay: `${index * 0.8}s`,
              }}
            >
              <span className={`intro__picture intro__picture--${name}`}>
                {name === 'orange' && <span className="intro__sun" style={{ width: px(size * 0.12), height: px(size * 0.12) }} />}
                {name === 'orange' && <span className="intro__hill" style={{ borderLeftWidth: px(size * 0.2), borderRightWidth: px(size * 0.2), borderBottomWidth: px(size * 0.24) }} />}
              </span>
            </span>
          </span>
        ))}
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(12, size * 0.11)), marginTop: px(size * 0.16) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

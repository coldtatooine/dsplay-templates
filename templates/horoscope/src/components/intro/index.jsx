import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import Glyph from '../glyph';
import { SIGN_IDS } from '../../lib/zodiac';
import './style.sass';

// The loader draws what the media is about: the twelve glyphs on a wheel that turns slowly (each stays upright) round a star that pulses, with three stars twinkling.
// Only HTML boxes are animated, around static SVG: the old Android WebViews cannot transform SVG.

const STARS = [
  { x: 12, y: 18, delay: '0s' },
  { x: 84, y: 26, delay: '0.7s' },
  { x: 74, y: 82, delay: '1.4s' },
];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="img" aria-label={t('Loading')}>
      {STARS.map((star) => (
        <span
          key={star.x}
          className="intro__twinkle"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${size / 14}px`, height: `${size / 14}px`, animationDelay: star.delay, WebkitAnimationDelay: star.delay }}
        />
      ))}
      <div className="intro__wheel" style={{
        width: `${size}px`, height: `${size}px`, marginLeft: `${-size / 2}px`, marginTop: `${-size / 2}px`,
      }}
      >
        {SIGN_IDS.map((id, i) => {
          const angle = (Math.PI * 2 * i) / SIGN_IDS.length - Math.PI / 2;
          return (
            <span
              key={id}
              className="intro__sign"
              style={{
                left: `${50 + Math.cos(angle) * 42}%`,
                top: `${50 + Math.sin(angle) * 42}%`,
                width: `${size / 6}px`,
                height: `${size / 6}px`,
                marginLeft: `${-size / 12}px`,
                marginTop: `${-size / 12}px`,
              }}
            >
              <Glyph id={id} className="intro__glyph" strokeWidth={1.6} />
            </span>
          );
        })}
      </div>
      <span className="intro__core" style={{ width: `${size / 5}px`, height: `${size / 5}px` }} />
    </div>
  );
}

export default Intro;

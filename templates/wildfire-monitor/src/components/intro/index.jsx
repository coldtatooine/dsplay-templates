import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the media is about, wildfires: a flame, built from two rounded boxes turned on their
// corner, that flickers while two sparks rise from it one after the other, over a faint glow on the ground, in
// the template's dark page, its orange and its amber. Only HTML boxes are animated: the old Android WebViews
// cannot transform SVG.

const even = (value) => 2 * Math.round(value / 2);

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the art's side
  const art = useMemo(() => even(Math.min(h * 0.34, w * 0.5)), [w, h]);
  const box = (centerX, centerY, size) => ({
    left: `${Math.round(art * centerX - size / 2)}px`,
    top: `${Math.round(art * centerY - size / 2)}px`,
    width: `${Math.round(size)}px`,
    height: `${Math.round(size)}px`,
  });
  const sparks = [[0.3, 0.42, 0.07, 0], [0.7, 0.3, 0.055, -0.8]].map(([x, y, size, delay]) => ({
    key: x,
    style: {
      ...box(x, y, art * size),
      borderRadius: '50%',
      animationDelay: `${delay}s`,
      WebkitAnimationDelay: `${delay}s`,
    },
  }));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__art" style={{ width: `${art}px`, height: `${art}px` }} aria-hidden="true">
        <span className="intro__glow" style={{ left: `${Math.round(art * 0.2)}px`, top: `${Math.round(art * 0.82)}px`, width: `${Math.round(art * 0.6)}px`, height: `${Math.round(art * 0.12)}px` }} />
        <div className="intro__flame">
          <span className="intro__fire intro__fire--outer" style={box(0.5, 0.58, art * 0.5)} />
          <span className="intro__fire intro__fire--inner" style={box(0.5, 0.68, art * 0.26)} />
        </div>
        {sparks.map(({ key, style }) => <span key={key} className="intro__spark" style={style} />)}
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(art * 0.1), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(art * 0.1)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

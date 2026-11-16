import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the media is about, the weather: a cloud, built from boxes, that rocks gently while three
// raindrops fall from it one after the other, in the template's dark blue and its rain blue. Only HTML boxes are
// animated: the old Android WebViews cannot transform SVG.

const even = (value) => 2 * Math.round(value / 2);

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the art's side
  const art = useMemo(() => even(Math.min(h * 0.34, w * 0.5)), [w, h]);
  const part = (left, top, width, height, radius) => ({
    left: `${Math.round(art * left)}px`,
    top: `${Math.round(art * top)}px`,
    width: `${Math.round(art * width)}px`,
    height: `${Math.round(art * height)}px`,
    borderRadius: radius,
  });
  const drops = [0.3, 0.5, 0.7].map((center, index) => ({
    key: index,
    style: {
      ...part(center - 0.05, 0.6, 0.1, 0.14, '50% 50% 50% 50% / 60% 60% 40% 40%'),
      animationDelay: `${index * -0.4}s`,
      WebkitAnimationDelay: `${index * -0.4}s`,
    },
  }));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__art" style={{ width: `${art}px`, height: `${art}px` }} aria-hidden="true">
        <div className="intro__cloud">
          <span className="intro__puff" style={part(0.1, 0.3, 0.8, 0.32, `${Math.round(art * 0.16)}px`)} />
          <span className="intro__puff" style={part(0.18, 0.14, 0.38, 0.38, '50%')} />
          <span className="intro__puff" style={part(0.4, 0.04, 0.46, 0.46, '50%')} />
        </div>
        {drops.map(({ key, style }) => <span key={key} className="intro__drop" style={style} />)}
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(art * 0.1), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(art * 0.12)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

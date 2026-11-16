import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a post card on the template's blue, with the avatar, the name,
// the lines of text (a light sweeps over them) and the three reactions that pulse one after the other.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const REACTIONS = ['like', 'love', 'haha'];
const TEXT_LINES = [100, 92, 58];

const px = (value) => `${Math.round(value)}px`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  const pad = size * 0.12;
  const avatar = Math.round((size * 0.34) / 2) * 2;
  const dot = Math.round((size * 0.14) / 2) * 2;
  const textWidth = size * 2 - pad * 2;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__card" style={{ width: px(size * 2), height: px(size * 1.4), borderRadius: px(size * 0.07) }}>
        <span className="intro__avatar" style={{ left: px(pad), top: px(pad), width: px(avatar), height: px(avatar) }} />
        <span className="intro__name" style={{ left: px(pad * 2 + avatar), top: px(pad + avatar * 0.14), width: px(size * 0.7), height: px(avatar * 0.3) }} />
        <span className="intro__date" style={{ left: px(pad * 2 + avatar), top: px(pad + avatar * 0.6), width: px(size * 0.4), height: px(avatar * 0.2) }} />
        {TEXT_LINES.map((width, index) => (
          <span
            key={width}
            className="intro__line"
            style={{
              left: px(pad), top: px(pad * 2 + avatar + index * size * 0.14), width: px((textWidth * width) / 100), height: px(size * 0.07),
            }}
          />
        ))}
        {REACTIONS.map((reaction, index) => (
          <span
            key={reaction}
            className={`intro__reaction intro__reaction--${reaction}`}
            style={{
              left: px(pad + index * dot * 1.7), bottom: px(pad), width: px(dot), height: px(dot), animationDelay: `${index * 0.4}s`, WebkitAnimationDelay: `${index * 0.4}s`,
            }}
          />
        ))}
        <span className="intro__shine" />
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(12, size * 0.11)), marginTop: px(size * 0.16) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

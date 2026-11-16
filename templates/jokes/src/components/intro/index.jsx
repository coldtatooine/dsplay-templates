import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the media is about: a speech bubble with a question mark, and three dots that bounce one after the other under it (a message being typed).
// Only HTML boxes are animated; the old Android WebViews cannot transform SVG.

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 4), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="img" aria-label={t('Loading')}>
      <div className="intro__bubble" style={{ width: `${size}px`, height: `${size * 0.8}px`, borderRadius: `${size * 0.28}px` }}>
        <span className="intro__mark" style={{ fontSize: `${size * 0.6}px`, lineHeight: `${size * 0.8}px` }}>?</span>
        <span className="intro__tail" style={{ width: `${size * 0.2}px`, height: `${size * 0.2}px`, right: `${size * 0.18}px`, bottom: `${-size * 0.08}px` }} />
      </div>
      <div className="intro__dots" style={{ marginTop: `${size * 0.22}px` }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="intro__dot"
            style={{
              width: `${size / 7}px`, height: `${size / 7}px`, margin: `0 ${size / 20}px`, animationDelay: `${i * 0.18}s`, WebkitAnimationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Intro;

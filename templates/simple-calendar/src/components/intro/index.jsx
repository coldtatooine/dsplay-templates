import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own screen: the blue side with the word, the dark side with a calendar page whose days light up one after the other, like today's marker.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const DAYS = Array.from({ length: 28 }, (v, i) => String(i + 1).padStart(2, '0'));
const STEP = 0.1;

const delayed = (delay) => ({ animationDelay: delay, WebkitAnimationDelay: delay });

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the page is as wide as the dark side allows: beside the blue side on a wide screen, below it on a tall one
  const size = useMemo(() => Math.round(w > h ? Math.min(w * 0.3, h * 0.5) : Math.min(w * 0.7, h * 0.32)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__side">
        <span className="intro__text" style={{ fontSize: `${Math.round(size * 0.13)}px` }}>{t('Loading')}</span>
      </div>
      <div className="intro__stage">
        <div className="intro__page" style={{ width: `${size}px`, borderRadius: `${Math.round(size * 0.04)}px` }}>
          <div className="intro__header" style={{ height: `${Math.round(size * 0.18)}px` }}>
            <span className="intro__ring" style={{ left: '22%', width: `${Math.round(size * 0.035)}px`, height: `${Math.round(size * 0.09)}px` }} />
            <span className="intro__ring" style={{ right: '22%', width: `${Math.round(size * 0.035)}px`, height: `${Math.round(size * 0.09)}px` }} />
          </div>
          <div className="intro__days" style={{ padding: `${Math.round(size * 0.03)}px` }}>
            {DAYS.map((day, i) => (
              <span key={day} className="intro__cell" style={{ height: `${Math.round(size * 0.12)}px` }}>
                <span
                  className="intro__day"
                  style={{
                    ...delayed(`${(i * STEP).toFixed(1)}s`),
                    width: `${Math.round(size * 0.1)}px`,
                    height: `${Math.round(size * 0.1)}px`,
                    lineHeight: `${Math.round(size * 0.1)}px`,
                    fontSize: `${Math.round(size * 0.055)}px`,
                  }}
                >
                  {day}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;

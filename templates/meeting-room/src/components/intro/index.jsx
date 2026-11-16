import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own event board: the blue panel with the time line and the title bars on the left, the
// logo card under them, the two blue panels on the right with the host logo and the place card, and the time line
// stepping through the hours of the event.
// Only HTML boxes are animated (a strip of times moved in steps): the old Android WebViews cannot transform SVG.

const TIMES = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00'];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of the board text; everything inside is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.035, h * 0.045)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__board" style={{ fontSize: `${size}px` }} aria-hidden="true">
        <div className="intro__left">
          <div className="intro__time">
            <span className="intro__strip">
              {TIMES.map((time) => <span key={time} className="intro__hours">{time}</span>)}
            </span>
          </div>
          <span className="intro__title intro__title--long" />
          <span className="intro__title intro__title--short" />
          <span className="intro__logo"><span className="intro__mark" /></span>
        </div>
        <div className="intro__right">
          <div className="intro__host">
            <span className="intro__logo intro__logo--host"><span className="intro__mark" /></span>
          </div>
          <div className="intro__place">
            <span className="intro__logo intro__logo--info">
              <span className="intro__line intro__line--city" />
              <span className="intro__line intro__line--date" />
            </span>
          </div>
        </div>
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.8}px`, marginTop: `${size * 1.1}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own directions board: white rows with the logo square, the orange place and the dark
// destination name on the left, and the arrow on the right that turns through the eight directions the template knows.
// Only HTML boxes are animated (an arrow drawn with a bar and a corner): the old Android WebViews cannot transform SVG.

const ROWS = 3;
const LOOP = 4;
const NAME_WIDTHS = [8.5, 6.5, 10];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of the board text; everything inside is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.04, h * 0.05)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__board" style={{ fontSize: `${size}px` }} aria-hidden="true">
        {Array.from({ length: ROWS }, (unused, row) => {
          const delay = `${(row * 1.3 - LOOP).toFixed(2)}s`;
          return (
            <div key={row} className="intro__row">
              <span className="intro__logo" />
              <div className="intro__info">
                <span className="intro__place" />
                <span className="intro__name" style={{ width: `${NAME_WIDTHS[row]}em` }} />
              </div>
              <span className="intro__direction" style={{ animationDelay: delay, WebkitAnimationDelay: delay }}>
                <span className="intro__shaft" />
                <span className="intro__head" />
              </span>
            </div>
          );
        })}
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.6}px`, marginTop: `${size * 1.1}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

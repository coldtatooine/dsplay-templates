import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own rate card: the beige card on the dark background, a room name and its description
// on the left of each row and the blue-grey price tag on the right, whose price keeps changing.
// Only HTML boxes are animated (a strip of prices moved in steps): the old Android WebViews cannot transform SVG.

const ROWS = 3;
const LOOP = 3;
const PRICES = [['$ 250', '$ 380', '$ 650', '$ 950'], ['$ 380', '$ 650', '$ 950', '$ 250'], ['$ 650', '$ 950', '$ 250', '$ 380']];
const NAME_WIDTHS = [6.2, 5, 7];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of the card text; everything inside is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.05, h * 0.05)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__card" style={{ fontSize: `${size}px` }} aria-hidden="true">
        {Array.from({ length: ROWS }, (unused, row) => {
          const delay = `${(row * 0.4 - LOOP).toFixed(2)}s`;
          return (
            <div key={row} className="intro__row">
              <div className="intro__info">
                <span className="intro__name" style={{ width: `${NAME_WIDTHS[row]}em` }} />
                <span className="intro__desc" />
              </div>
              <div className="intro__tag">
                <span className="intro__notch" />
                <span className="intro__strip" style={{ animationDelay: delay, WebkitAnimationDelay: delay }}>
                  {PRICES[row].map((price) => <span key={price} className="intro__price">{price}</span>)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.6}px`, marginTop: `${size * 1.1}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

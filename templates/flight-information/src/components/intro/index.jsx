import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own flight board: the teal header, the white and grey rows of the table and the dark
// teal flap tiles, each one stepping through its letters like a split-flap display.
// Only HTML boxes are animated (a strip of letters moved in steps): the old Android WebViews cannot transform SVG.

const ROWS = 3;
const COLS = 6;
const LETTERS = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
const LOOP = 2.5;

const tileLetters = (row, col) => [0, 1, 2, 3, 4].map((k) => LETTERS[(row * 7 + col * 3 + k * 5) % LETTERS.length]);

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of one flap tile; everything else is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.1, h * 0.14)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__board" style={{ fontSize: `${size}px` }} aria-hidden="true">
        <div className="intro__header">
          <span className="intro__title" />
          <span className="intro__clock" />
        </div>
        {Array.from({ length: ROWS }, (unused, row) => (
          <div key={row} className="intro__row">
            {Array.from({ length: COLS }, (unused2, col) => {
              const delay = `${(col * 0.15 + row * 0.1 - LOOP).toFixed(2)}s`;
              return (
                <span key={col} className="intro__tile">
                  <span className="intro__strip" style={{ animationDelay: delay, WebkitAnimationDelay: delay }}>
                    {tileLetters(row, col).map((letter, k) => <span key={k} className="intro__letter">{letter}</span>)}
                  </span>
                  <span className="intro__seam" />
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.36}px`, marginTop: `${size * 0.7}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

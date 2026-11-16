import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: its grey bevelled frame holding a QR code (three finder squares,
// data cells that light up in a diagonal wave) with a Wi-Fi logo in the middle whose three signal bars rise one
// after the other. Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const GRID = 13; // cells per side
const FINDER = 5; // cells per side of a finder square
const LOGO = 3; // cells per side of the Wi-Fi logo, in the middle
const LOOP = 2.4; // seconds

const even = (value) => 2 * Math.round(value / 2);

const inFinder = (row, col) => {
  const near = (value) => value < FINDER + 1;
  const far = (value) => value >= GRID - FINDER - 1;
  return (near(row) && near(col)) || (near(row) && far(col)) || (far(row) && near(col));
};
const inLogo = (value) => value >= (GRID - LOGO) / 2 && value < (GRID + LOGO) / 2;

// the data cells, a fixed pattern that looks like a code
const cells = [];
for (let row = 0; row < GRID; row += 1) {
  for (let col = 0; col < GRID; col += 1) {
    if (!inFinder(row, col) && !(inLogo(row) && inLogo(col)) && (row * 7 + col * 13 + row * col) % 4 !== 0) {
      cells.push({ row, col });
    }
  }
}

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the frame's side
  const sizes = useMemo(() => {
    const side = even(Math.min(h * 0.42, w * 0.55));
    const border = Math.max(4, Math.round(side * 0.05));
    const inner = side - 2 * border;
    const cell = Math.max(2, Math.floor(inner / (GRID + 2)));
    return {
      side, border, cell, offset: Math.floor((inner - cell * GRID) / 2),
    };
  }, [w, h]);

  const {
    side, border, cell, offset,
  } = sizes;
  const at = (index) => `${offset + index * cell}px`;
  const box = (row, col, span) => ({
    left: at(col), top: at(row), width: `${span * cell}px`, height: `${span * cell}px`,
  });
  const finder = (row, col) => (
    <div key={`${row}-${col}`} className="intro__finder" style={box(row, col, FINDER)}>
      <span className="intro__finder-hole" style={{ left: `${cell}px`, top: `${cell}px`, width: `${3 * cell}px`, height: `${3 * cell}px` }} />
      <span className="intro__finder-dot" style={{ left: `${2 * cell}px`, top: `${2 * cell}px`, width: `${cell}px`, height: `${cell}px` }} />
    </div>
  );
  const bars = [0, 1, 2].map((index) => {
    const barWidth = Math.max(2, Math.round(cell * 0.5));
    const barHeight = Math.round(cell * (0.8 + index * 0.7));
    return (
      <span
        key={index}
        className="intro__signal"
        style={{
          width: `${barWidth}px`,
          height: `${barHeight}px`,
          left: `${Math.round(cell * 0.45 + index * cell * 0.85)}px`,
          bottom: `${Math.round(cell * 0.5)}px`,
          animationDelay: `${(index * 0.3) - LOOP}s`,
          WebkitAnimationDelay: `${(index * 0.3) - LOOP}s`,
        }}
      />
    );
  });

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__frame" style={{ width: `${side}px`, height: `${side}px`, borderWidth: `${border}px` }} aria-hidden="true">
        {finder(0, 0)}
        {finder(0, GRID - FINDER)}
        {finder(GRID - FINDER, 0)}
        {cells.map(({ row, col }) => {
          const delay = `${((row + col) * 0.09) - LOOP}s`;
          return (
            <span
              key={`${row}-${col}`}
              className="intro__cell"
              style={{ ...box(row, col, 1), animationDelay: delay, WebkitAnimationDelay: delay }}
            />
          );
        })}
        <div className="intro__logo" style={{ ...box((GRID - LOGO) / 2, (GRID - LOGO) / 2, LOGO), borderRadius: `${Math.round(cell * 0.5)}px` }}>
          {bars}
        </div>
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(side * 0.09), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(side * 0.12)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

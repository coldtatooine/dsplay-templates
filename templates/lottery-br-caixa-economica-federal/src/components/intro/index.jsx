import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is what the template is about: lottery balls, in the colours of the games (Mega-Sena green, Quina blue,
// Lotofácil purple, Lotomania orange, Dupla Sena red, Federal blue), each lighting up and lifting one after the other
// as if the draw were being made. Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const BALLS = [
  { number: '05', color: '#209869' },
  { number: '17', color: '#260085' },
  { number: '23', color: '#930989' },
  { number: '36', color: '#f78100' },
  { number: '41', color: '#bf194e' },
  { number: '58', color: '#1a499b' },
];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // a wide screen draws the six balls in one row, the others in two rows of three
  const { ball, columns } = useMemo(() => {
    const wide = w >= h * 1.4;
    const size = wide ? Math.min(w / 10, h / 3.4) : Math.min(w / 4.6, h / 6);
    return {
      ball: Math.max(16, 2 * Math.round(size / 2)),
      columns: wide ? 6 : 3,
    };
  }, [w, h]);

  const gap = Math.round(ball * 0.3);
  const rowWidth = columns * ball + (columns - 1) * gap;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__balls" style={{ width: `${rowWidth + 2}px`, fontSize: `${Math.round(ball * 0.4)}px` }} aria-hidden="true">
        {BALLS.map(({ number, color }, index) => (
          <span
            key={number}
            className="intro__ball"
            style={{
              width: `${ball}px`,
              height: `${ball}px`,
              lineHeight: `${ball}px`,
              marginRight: index % columns === columns - 1 ? 0 : `${gap}px`,
              marginBottom: columns === 3 && index < columns ? `${gap}px` : 0,
              backgroundColor: color,
              animationDelay: `${-2.4 + index * 0.3}s`,
              WebkitAnimationDelay: `${-2.4 + index * 0.3}s`,
            }}
          >
            {number}
          </span>
        ))}
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(ball * 0.3), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(ball * 0.4)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

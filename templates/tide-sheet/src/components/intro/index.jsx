import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own tide chart: the night card of its gradient, the moon that pulls the sea and a row of
// water columns that rise and fall one after the other, the high tide travelling along the chart.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const COLUMNS = 18;
const LOOP = 3;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  // the size of the chart; everything inside is in em of it
  const size = useMemo(() => Math.round(Math.min(w * 0.04, h * 0.05)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__chart" style={{ fontSize: `${size}px` }} aria-hidden="true">
        <span className="intro__moon">
          <span className="intro__crater intro__crater--big" />
          <span className="intro__crater intro__crater--small" />
        </span>
        <span className="intro__level" />
        <div className="intro__water">
          {Array.from({ length: COLUMNS }, (unused, col) => {
            const delay = `${((col * LOOP) / COLUMNS - LOOP).toFixed(2)}s`;
            return <span key={col} className="intro__column" style={{ animationDelay: delay, WebkitAnimationDelay: delay }} />;
          })}
        </div>
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.9}px`, marginTop: `${size * 1.2}px` }}>{`— ${t('Loading')} —`}</span>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own wall of clocks: three faces (the first one grey, like the local clock), each with its city's label to come,
// and hands that show a different time on each, the sweep hands one step behind the other.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const CLOCKS = [
  { modifier: 'local', delay: '0s', hour: '-3s', minute: '-1s' },
  { modifier: 'city', delay: '-0.5s', hour: '-9s', minute: '-4s' },
  { modifier: 'city', delay: '-1s', hour: '-14s', minute: '-2.5s' },
];

const TICKS = [0, 90, 180, 270];

// whole pixels, so the dots stay round
const even = (value) => 2 * Math.max(2, Math.round(value / 2));

const delayed = (delay) => ({ animationDelay: delay, WebkitAnimationDelay: delay });

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w / 6, h / 3)), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__clocks">
        {CLOCKS.map((clock, index) => (
          <div key={clock.delay} className="intro__clock" style={{ width: `${size}px`, margin: `0 ${size * 0.12}px` }}>
            <div className={`intro__face intro__face--${clock.modifier}`} style={{ width: `${size}px`, height: `${size}px` }}>
              {TICKS.map((angle) => (
                <span
                  key={angle}
                  className="intro__tick"
                  style={{
                    left: `${50 + Math.sin((angle * Math.PI) / 180) * 41}%`,
                    top: `${50 - Math.cos((angle * Math.PI) / 180) * 41}%`,
                    width: `${even(size * 0.05)}px`,
                    height: `${even(size * 0.05)}px`,
                    marginLeft: `${-even(size * 0.05) / 2}px`,
                    marginTop: `${-even(size * 0.05) / 2}px`,
                  }}
                />
              ))}
              <span className="intro__hand intro__hand--hours" style={{ ...delayed(clock.hour), width: `${Math.max(3, size * 0.03)}px`, marginLeft: `${-Math.max(3, size * 0.03) / 2}px` }} />
              <span className="intro__hand intro__hand--minutes" style={{ ...delayed(clock.minute), width: `${Math.max(2, size * 0.02)}px`, marginLeft: `${-Math.max(2, size * 0.02) / 2}px` }} />
              <span className="intro__hand intro__hand--seconds" style={{ ...delayed(clock.delay), width: `${Math.max(1, size * 0.01)}px`, marginLeft: `${-Math.max(1, size * 0.01) / 2}px` }} />
              <span className="intro__cover" style={{ width: `${size * 0.06}px`, height: `${size * 0.06}px`, marginLeft: `${-size * 0.03}px`, marginTop: `${-size * 0.03}px` }} />
            </div>
            <span className="intro__city" style={{ width: `${size * (index === 1 ? 0.45 : 0.6)}px`, height: `${size * 0.09}px`, marginTop: `${size * 0.14}px`, ...delayed(`${index * 0.25}s`) }} />
          </div>
        ))}
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.2}px`, marginTop: `${size * 0.3}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

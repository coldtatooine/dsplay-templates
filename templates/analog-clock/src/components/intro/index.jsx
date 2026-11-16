import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own clock: the grey face with white numerals, the three hands in the template's colours,
// and a sweep hand that does one lap in the minimum loading time.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const NUMERALS = [
  { text: '12', left: 50, top: 14 },
  { text: '3', left: 86, top: 50 },
  { text: '6', left: 50, top: 86 },
  { text: '9', left: 14, top: 50 },
];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__face" style={{ width: `${size}px`, height: `${size}px` }}>
        {NUMERALS.map((numeral) => (
          <span
            key={numeral.text}
            className="intro__numeral"
            style={{
              left: `${numeral.left}%`, top: `${numeral.top}%`, fontSize: `${size * 0.17}px`, width: `${size * 0.3}px`, height: `${size * 0.2}px`, marginLeft: `${-size * 0.15}px`, marginTop: `${-size * 0.1}px`, lineHeight: `${size * 0.2}px`,
            }}
          >
            {numeral.text}
          </span>
        ))}
        <span className="intro__hand intro__hand--hours" style={{ width: `${Math.max(3, size * 0.03)}px`, marginLeft: `${-Math.max(3, size * 0.03) / 2}px` }} />
        <span className="intro__hand intro__hand--minutes" style={{ width: `${Math.max(2, size * 0.02)}px`, marginLeft: `${-Math.max(2, size * 0.02) / 2}px` }} />
        <span className="intro__hand intro__hand--seconds" style={{ width: `${Math.max(1, size * 0.01)}px`, marginLeft: `${-Math.max(1, size * 0.01) / 2}px` }} />
        <span className="intro__cover" style={{ width: `${size * 0.06}px`, height: `${size * 0.06}px`, marginLeft: `${-size * 0.03}px`, marginTop: `${-size * 0.03}px` }} />
      </div>
      <span className="intro__text" style={{ fontSize: `${size * 0.11}px`, marginTop: `${size * 0.16}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

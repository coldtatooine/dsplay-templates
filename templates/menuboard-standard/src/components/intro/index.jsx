import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: the chalkboard menu. The round logo on the left, a title banner
// and the lines of products and prices written in chalk one after the other. Only HTML boxes are animated: the old
// Android WebViews cannot animate SVG.

const LOOP = 2.8;

// the chalk lines: how long the product name is (in % of the row) and when it is written (in s)
const ROWS = [
  { name: 62, at: 0.5 },
  { name: 46, at: 0.9 },
  { name: 70, at: 1.3 },
  { name: 54, at: 1.7 },
];

const px = (value) => `${Math.round(value)}px`;
// a negative delay puts each line in its own phase from the first frame
const phase = (at) => `${(at - LOOP).toFixed(2)}s`;
const delayed = (at) => ({ animationDelay: phase(at), WebkitAnimationDelay: phase(at) });

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const unit = useMemo(() => Math.max(40, Math.min(Math.round(Math.min(w, h) / 3), Math.round(w * 0.28))), [w, h]);
  const { className } = props;

  const frame = Math.max(3, Math.round(unit * 0.05));
  const chalk = Math.max(2, Math.round(unit * 0.018));
  const bar = Math.max(3, Math.round(unit * 0.07));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div
        className="intro__board"
        style={{
          width: px(unit * 3), height: px(unit * 1.75), padding: px(unit * 0.1), borderWidth: px(frame), borderRadius: px(unit * 0.1),
        }}
      >
        <div className="intro__logo" aria-hidden="true" style={{ width: px(unit * 0.7), height: px(unit * 0.7), borderWidth: px(chalk * 2), marginRight: px(unit * 0.14) }}>
          <span className="intro__plate" style={{ width: px(unit * 0.42), height: px(unit * 0.42), borderWidth: px(chalk) }} />
        </div>
        <div className="intro__lines" aria-hidden="true">
          <div className="intro__banner" style={{ height: px(unit * 0.3), borderWidth: px(chalk), borderRadius: px(unit * 0.07) }}>
            <span className="intro__chalk intro__chalk--title" style={{ width: '64%', height: px(bar), ...delayed(0.1) }} />
          </div>
          {ROWS.map(({ name, at }) => (
            <div key={at} className="intro__row" style={{ height: px(unit * 0.2) }}>
              <span className="intro__chalk" style={{ width: `${name}%`, height: px(bar), ...delayed(at) }} />
              <span className="intro__leader" style={{ borderBottomWidth: px(chalk), marginLeft: px(unit * 0.06), marginRight: px(unit * 0.06) }} />
              <span className="intro__chalk intro__chalk--price" style={{ width: px(unit * 0.3), height: px(bar), ...delayed(at + 0.2) }} />
            </div>
          ))}
        </div>
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(14, unit * 0.2)), marginTop: px(unit * 0.3) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

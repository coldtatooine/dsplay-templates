import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a menu column with the brand box, a section flag and the products
// with their price tags, a shine sweeping over each price in turn. It wears the template's default colours (the gold
// board and the dark red flag). Only HTML boxes are animated: the old Android WebViews cannot animate SVG.

const LOOP = 2.4;

// the products: how long the name is (in % of the row) and when its price shines (in s)
const ITEMS = [
  { name: 74, desc: 52, at: 0 },
  { name: 58, desc: 0, at: 0.6 },
  { name: 80, desc: 40, at: 1.2 },
];

const px = (value) => `${Math.round(value)}px`;
// a negative delay puts each shine in its own phase from the first frame
const phase = (at) => `${(at - LOOP).toFixed(2)}s`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const unit = useMemo(() => Math.max(40, Math.min(Math.round(Math.min(w, h) / 3), Math.round(w * 0.4))), [w, h]);
  const { className } = props;

  const flag = Math.round(unit * 0.26);
  const bar = Math.max(3, Math.round(unit * 0.06));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__top" style={{ height: px(unit * 0.08) }} />
      <div className="intro__menu" aria-hidden="true" style={{ width: px(unit * 1.9) }}>
        <div
          className="intro__brand"
          style={{
            width: px(unit * 0.62), height: px(unit * 0.5), borderRadius: px(unit * 0.05), marginBottom: px(unit * 0.16),
          }}
        />
        <div className="intro__flag" style={{ height: px(flag), marginBottom: px(unit * 0.1) }}>
          <span className="intro__tail intro__tail--l" style={{ borderTopWidth: px(flag / 2), borderBottomWidth: px(flag / 2), borderLeftWidth: px(unit * 0.1) }} />
          <span className="intro__flag-body" style={{ width: px(unit * 1.2), height: px(flag) }}>
            <span className="intro__flag-title" style={{ height: px(bar) }} />
          </span>
          <span className="intro__tail intro__tail--r" style={{ borderTopWidth: px(flag / 2), borderBottomWidth: px(flag / 2), borderRightWidth: px(unit * 0.1) }} />
        </div>
        {ITEMS.map(({ name, desc, at }) => (
          <div key={at} className="intro__item">
            <div className="intro__line" style={{ height: px(unit * 0.22) }}>
              <span className="intro__number" style={{ width: px(unit * 0.16), height: px(unit * 0.16), borderRadius: px(unit * 0.03), marginRight: px(unit * 0.1) }} />
              <span className="intro__names">
                <span className="intro__name" style={{ width: `${name}%`, height: px(bar) }} />
                <span className="intro__desc" style={{ width: `${desc}%`, height: px(Math.max(2, bar / 2)), marginTop: px(bar / 2), visibility: desc ? 'visible' : 'hidden' }} />
              </span>
              <span className="intro__price" style={{ width: px(unit * 0.4), height: px(unit * 0.16), borderRadius: px(unit * 0.04) }}>
                <span className="intro__shine" style={{ width: px(unit * 0.14), animationDelay: phase(at), WebkitAnimationDelay: phase(at) }} />
              </span>
            </div>
            <span className="intro__rule" />
          </div>
        ))}
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(14, unit * 0.2)), marginTop: px(unit * 0.22) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

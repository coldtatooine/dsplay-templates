import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: two blackboards on the wood. On the left the promotion: the round
// logo on its banner, a title and the photos of the featured products sliding by. On the right the lines of
// products and prices written in chalk one after the other. Only HTML boxes are animated: the old Android
// WebViews cannot animate SVG.

const LOOP = 3;

// the chalk lines: how long the product name is (in % of the row) and when it is written (in s)
const ROWS = [
  { name: 60, at: 0.5 },
  { name: 44, at: 0.9 },
  { name: 68, at: 1.3 },
  { name: 52, at: 1.7 },
];

// the featured photos: the first one comes back at the end so that the slide loops without a jump
const PHOTOS = ['orange', 'red', 'yellow', 'orange'];

const px = (value) => `${Math.round(value)}px`;
// a negative delay puts each animated part in its own phase from the first frame
const phase = (at) => `${(at - LOOP).toFixed(2)}s`;
const delayed = (at) => ({ animationDelay: phase(at), WebkitAnimationDelay: phase(at) });

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const unit = useMemo(() => Math.max(40, Math.min(Math.round(Math.min(w, h) / 3), Math.round(w * 0.28))), [w, h]);
  const { className } = props;

  const chalk = Math.max(2, Math.round(unit * 0.018));
  const bar = Math.max(3, Math.round(unit * 0.07));
  const radius = px(unit * 0.08);
  const padding = px(unit * 0.09);

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__boards" style={{ width: px(unit * 3.2), height: px(unit * 1.8) }}>
        <div className="intro__panel intro__panel--promo" aria-hidden="true" style={{ borderRadius: radius, padding, marginRight: px(unit * 0.1) }}>
          <div className="intro__logo-banner" style={{ height: px(unit * 0.36), borderRadius: px(unit * 0.05) }}>
            <span className="intro__logo" style={{ width: px(unit * 0.26), height: px(unit * 0.26), borderWidth: px(chalk * 2) }} />
          </div>
          <span className="intro__chalk intro__chalk--title" style={{ width: '56%', height: px(bar), marginTop: px(unit * 0.09), marginBottom: px(unit * 0.09), ...delayed(0.1) }} />
          <div className="intro__window" style={{ borderRadius: px(unit * 0.04) }}>
            <div className="intro__slides">
              {PHOTOS.map((color, index) => (
                <span key={index} className={`intro__photo intro__photo--${color}`}>
                  <span className="intro__dish" style={{ width: px(unit * 0.42), height: px(unit * 0.42), borderWidth: px(chalk * 2) }} />
                </span>
              ))}
            </div>
          </div>
          <div className="intro__dots" style={{ height: px(unit * 0.14) }}>
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="intro__dot"
                style={{
                  width: px(unit * 0.07), height: px(unit * 0.07), marginLeft: px(unit * 0.035), marginRight: px(unit * 0.035), ...delayed(dot),
                }}
              />
            ))}
          </div>
        </div>
        <div className="intro__panel intro__panel--menu" aria-hidden="true" style={{ borderRadius: radius, padding }}>
          <div className="intro__banner" style={{ height: px(unit * 0.3), borderWidth: px(chalk), borderRadius: px(unit * 0.06) }}>
            <span className="intro__chalk intro__chalk--title" style={{ width: '60%', height: px(bar), ...delayed(0.1) }} />
          </div>
          {ROWS.map(({ name, at }) => (
            <div key={at} className="intro__row" style={{ height: px(unit * 0.2) }}>
              <span className="intro__chalk" style={{ width: `${name}%`, height: px(bar), ...delayed(at) }} />
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

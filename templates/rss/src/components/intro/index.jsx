import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws one article of the feed, the way the template shows it: the picture (here with the feed symbol,
// whose waves go out one after the other), the orange title band with its headline lines and the description lines
// below. Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // the card is 16:9 on a wide screen and 3:4 on a tall one; everything inside is a percentage of it or of the symbol
  const { cardWidth, cardHeight, symbol } = useMemo(() => {
    const wide = w >= h;
    const height = wide ? Math.min(h * 0.62, (w * 0.8 * 9) / 16) : Math.min(h * 0.62, (w * 0.8 * 4) / 3);
    const width = wide ? (height * 16) / 9 : (height * 3) / 4;
    return {
      cardWidth: 2 * Math.round(width / 2),
      cardHeight: 2 * Math.round(height / 2),
      symbol: 2 * Math.round((height * 0.26) / 2),
    };
  }, [w, h]);

  const unit = Math.max(2, Math.round(symbol / 9));
  const ring = (index) => {
    const size = unit * (index === 1 ? 4.5 : 7.5);
    return {
      width: `${size}px`,
      height: `${size}px`,
      borderTopWidth: `${unit}px`,
      borderRightWidth: `${unit}px`,
      left: `${unit}px`,
      bottom: `${unit}px`,
    };
  };

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__card" style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }} aria-hidden="true">
        <div className="intro__picture" style={{ height: '100%' }}>
          <span className="intro__symbol" style={{ width: `${symbol}px`, height: `${symbol}px`, marginLeft: `${-symbol / 2}px`, marginTop: `${-symbol / 2}px` }}>
            <span className="intro__dot" style={{ width: `${unit * 2}px`, height: `${unit * 2}px` }} />
            <span className="intro__wave intro__wave--1" style={ring(1)} />
            <span className="intro__wave intro__wave--2" style={ring(2)} />
          </span>
        </div>
        <div className="intro__title">
          <span className="intro__line" style={{ width: '90%' }} />
          <span className="intro__line" style={{ width: '60%' }} />
        </div>
        <div className="intro__description">
          <span className="intro__line" style={{ width: '94%' }} />
          <span className="intro__line" style={{ width: '80%' }} />
          <span className="intro__line" style={{ width: '56%' }} />
        </div>
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(cardHeight * 0.09), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(cardHeight * 0.1)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws the alert the way the template shows it: the yellow message card with its red outline, now
// with a warning sign (a triangle and an exclamation mark) and a strip of message lines scrolling along the
// bottom, while a red ring pulses out of the card. Only HTML boxes are animated: the old Android WebViews
// cannot transform SVG.

const even = (value) => 2 * Math.round(value / 2);

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the card's height
  const sizes = useMemo(() => {
    const height = even(Math.min(w * 0.4, h * 0.4));
    const width = even(height * 1.25);
    const side = even(height * 0.56);
    const stroke = Math.max(2, Math.round(side * 0.1));
    const signHeight = Math.round(side * 0.866);
    const inner = side - 2 * Math.sqrt(3) * stroke;
    const innerHeight = Math.round(inner * 0.866);
    const bar = Math.max(2, Math.round(side * 0.07));
    return {
      height,
      width,
      side,
      signHeight,
      stroke,
      inner: Math.round(inner),
      innerHeight,
      bar,
      outline: Math.max(2, Math.round(height * 0.035)),
      radius: Math.round(height * 0.07),
      strip: Math.round(height * 0.14),
    };
  }, [w, h]);

  const {
    height, width, side, signHeight, stroke, inner, innerHeight, bar, outline, radius, strip,
  } = sizes;
  const lineHeight = Math.max(3, Math.round(strip * 0.36));

  const messages = [0, 1].flatMap((round) => [0.9, 0.5, 1.3, 0.7, 1.1].map((factor, index) => (
    <span
      key={`${round}-${index}`}
      className="intro__message"
      style={{
        width: `${Math.round(strip * 2 * factor)}px`,
        height: `${lineHeight}px`,
        marginTop: `${Math.round((strip - lineHeight) / 2)}px`,
        marginRight: `${Math.round(strip * 0.6)}px`,
        borderRadius: `${lineHeight / 2}px`,
      }}
    />
  )));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__alert" style={{ width: `${width}px`, height: `${height}px` }} aria-hidden="true">
        <span className="intro__ring" style={{ borderWidth: `${outline}px`, borderRadius: `${radius}px` }} />
        <div className="intro__card" style={{ borderWidth: `${outline}px`, borderRadius: `${radius}px` }}>
          <div className="intro__sign" style={{ width: `${side}px`, height: `${signHeight}px`, marginLeft: `${-side / 2}px`, top: `${Math.round(height * 0.12)}px` }}>
            <span className="intro__triangle" style={{ borderLeftWidth: `${side / 2}px`, borderRightWidth: `${side / 2}px`, borderBottomWidth: `${signHeight}px` }} />
            <span
              className="intro__triangle intro__triangle--inner"
              style={{
                left: `${Math.round((side - inner) / 2)}px`,
                top: `${signHeight - stroke - innerHeight}px`,
                borderLeftWidth: `${inner / 2}px`,
                borderRightWidth: `${inner / 2}px`,
                borderBottomWidth: `${innerHeight}px`,
              }}
            />
            <span className="intro__bar" style={{ width: `${bar}px`, height: `${Math.round(signHeight * 0.3)}px`, left: `${Math.round((side - bar) / 2)}px`, top: `${Math.round(signHeight * 0.36)}px`, borderRadius: `${bar / 2}px` }} />
            <span className="intro__dot" style={{ width: `${bar}px`, height: `${bar}px`, left: `${Math.round((side - bar) / 2)}px`, top: `${Math.round(signHeight * 0.72)}px`, borderRadius: `${bar / 2}px` }} />
          </div>
          <div className="intro__strip" style={{ height: `${strip}px` }}>
            <div className="intro__track" style={{ height: `${strip}px` }}>
              {messages}
            </div>
          </div>
        </div>
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(height * 0.12), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(height * 0.14)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

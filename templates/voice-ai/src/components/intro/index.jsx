import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about, a voice assistant that listens: a microphone (a capsule, its
// holder, stem and base) with the bars of the voice rising and falling on both sides, in the green of the
// assistant's spinner, on the template's black page. Only HTML boxes are animated: the old Android WebViews
// cannot transform SVG. The word uses the system fonts, the template bundles none.

const even = (value) => 2 * Math.round(value / 2);

// bar heights as a part of the art's height, from the outside in
const BARS = [0.16, 0.3, 0.5];

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the art's height
  const art = useMemo(() => even(Math.min(h * 0.4, w * 0.45)), [w, h]);

  const barWidth = Math.max(3, Math.round(art * 0.07));
  const margin = Math.max(2, Math.round(art * 0.05));
  const line = Math.max(2, Math.round(art * 0.04));
  const capsuleWidth = even(art * 0.28);
  const capsuleHeight = even(art * 0.5);
  const holder = even(art * 0.46);

  const bar = (height, key, index) => (
    <span
      key={key}
      className="intro__bar"
      style={{
        width: `${barWidth}px`,
        height: `${Math.round(art * height)}px`,
        borderRadius: `${barWidth / 2}px`,
        marginLeft: `${margin}px`,
        marginRight: `${margin}px`,
        animationDelay: `${index * -0.3}s`,
        WebkitAnimationDelay: `${index * -0.3}s`,
      }}
    />
  );
  const left = BARS.map((height, index) => bar(height, `l${index}`, index));
  const right = [...BARS].reverse().map((height, index) => bar(height, `r${index}`, BARS.length - 1 - index));

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__art" style={{ height: `${art}px` }} aria-hidden="true">
        <div className="intro__bars">{left}</div>
        <div className="intro__mic" style={{ width: `${holder}px`, height: `${art}px` }}>
          <span
            className="intro__capsule"
            style={{
              width: `${capsuleWidth}px`, height: `${capsuleHeight}px`, left: `${(holder - capsuleWidth) / 2}px`, top: `${Math.round(art * 0.06)}px`, borderRadius: `${capsuleWidth / 2}px`,
            }}
          />
          <span
            className="intro__holder"
            style={{
              width: `${holder}px`, height: `${Math.round(art * 0.28)}px`, top: `${Math.round(art * 0.32)}px`, borderWidth: `${line}px`, borderRadius: `0 0 ${holder / 2}px ${holder / 2}px`,
            }}
          />
          <span className="intro__stem" style={{ width: `${line}px`, height: `${Math.round(art * 0.12)}px`, left: `${(holder - line) / 2}px`, top: `${Math.round(art * 0.6)}px` }} />
          <span className="intro__base" style={{ width: `${even(art * 0.26)}px`, height: `${line}px`, left: `${(holder - even(art * 0.26)) / 2}px`, top: `${Math.round(art * 0.72)}px`, borderRadius: `${line / 2}px` }} />
        </div>
        <div className="intro__bars">{right}</div>
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(art * 0.11), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(art * 0.08)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

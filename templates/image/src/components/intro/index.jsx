import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about, a picture: a framed photo of a sun over two mountains that a band
// of light sweeps across, on the template's black page. Only HTML boxes are animated: the old Android WebViews
// cannot transform SVG. The word uses the system fonts, the template bundles none.

const even = (value) => 2 * Math.round(value / 2);

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();
  const { className } = props;

  // everything is a part of one number, the frame's height (the picture is 3:2)
  const sizes = useMemo(() => {
    const height = even(Math.min(h * 0.4, w * 0.5));
    const width = even(height * 1.5);
    const border = Math.max(3, Math.round(height * 0.035));
    return {
      height,
      width,
      border,
      sun: even(height * 0.2),
      near: even(width * 0.56),
      far: even(width * 0.4),
    };
  }, [w, h]);

  const {
    height, width, border, sun, near, far,
  } = sizes;
  const inner = { width: width - 2 * border, height: height - 2 * border };
  const mountain = (base, rise) => ({
    borderLeftWidth: `${base / 2}px`,
    borderRightWidth: `${base / 2}px`,
    borderBottomWidth: `${Math.round(rise)}px`,
  });

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__frame" style={{ width: `${width}px`, height: `${height}px`, borderWidth: `${border}px`, borderRadius: `${Math.round(height * 0.05)}px` }} aria-hidden="true">
        <div className="intro__picture" style={{ width: `${inner.width}px`, height: `${inner.height}px` }}>
          <span className="intro__sun" style={{ width: `${sun}px`, height: `${sun}px`, left: `${Math.round(inner.width * 0.2)}px`, top: `${Math.round(inner.height * 0.2)}px` }} />
          <span className="intro__mountain intro__mountain--far" style={{ left: `${Math.round(inner.width * 0.46)}px`, bottom: 0, ...mountain(far, inner.height * 0.52) }} />
          <span className="intro__mountain intro__mountain--near" style={{ left: `${-Math.round(inner.width * 0.08)}px`, bottom: 0, ...mountain(near, inner.height * 0.46) }} />
          <span className="intro__sweep" style={{ width: `${Math.round(width * 0.28)}px`, height: `${Math.round(height * 1.4)}px`, top: `${-Math.round(height * 0.2)}px` }} />
        </div>
      </div>
      <span
        className="intro__text"
        style={{ fontSize: `${Math.max(10, Math.min(Math.round(height * 0.1), Math.round(w * 0.05)))}px`, marginTop: `${Math.round(height * 0.14)}px` }}
      >
        {t('Loading')}
      </span>
    </div>
  );
}

export default Intro;

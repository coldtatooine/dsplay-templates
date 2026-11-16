import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader is the template's own information bar: a thin white strip, like the one it draws in a banner, with its
// clock, the weather, the quotes, the news title running and the sponsor box. In a portrait screen the bar stands up,
// as the template does. The news title keeps running along the strip.
// Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

// the pieces of one group of the running title, 15em long all together (the widths are in the sass)
const TICKER_PIECES = [0, 1, 2];
const GROUP_LENGTH = 15;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const horizontal = w >= h;

  // the thickness of the bar, whose tallest widget is 7em high in the template; everything inside is in em of it
  const {
    thickness, length, unit, groups,
  } = useMemo(() => {
    const size = horizontal ? Math.min(h * 0.5, w * 0.12) : Math.min(w * 0.5, h * 0.12);
    const barUnit = Math.max(4, Math.round(size / 7.5));
    const barLength = Math.round(horizontal ? w * 0.92 : h * 0.7);
    return {
      thickness: Math.round(size),
      length: barLength,
      unit: barUnit,
      // enough groups of pieces to fill the whole bar, whatever its length
      groups: Math.min(40, Math.ceil(barLength / barUnit / GROUP_LENGTH) + 1),
    };
  }, [w, h, horizontal]);
  const { className } = props;

  const barStyle = horizontal
    ? { width: `${length}px`, height: `${thickness}px`, fontSize: `${unit}px` }
    : { width: `${thickness}px`, height: `${length}px`, fontSize: `${unit}px` };

  return (
    <div {...props} className={`intro ${horizontal ? '' : 'intro--vertical'} ${className || ''}`} role="status">
      <div className="intro__bar" style={barStyle} aria-hidden="true">
        <span className="intro__clock" />
        <span className="intro__weather">
          <span className="intro__sun" />
          <span className="intro__temp" />
        </span>
        <span className="intro__quotes">
          <span className="intro__quote" />
          <span className="intro__quote intro__quote--short" />
        </span>
        <span className="intro__news">
          <span className="intro__channel" />
          <span className="intro__ticker">
            <span className="intro__strip">
              {Array.from({ length: groups }, (unused, group) => (
                <span key={group} className="intro__group">
                  {TICKER_PIECES.map((piece) => <span key={piece} className={`intro__piece intro__piece--${piece}`} />)}
                </span>
              ))}
            </span>
          </span>
        </span>
        <span className="intro__sponsor" />
      </div>
      <span className="intro__text" style={{ fontSize: `${Math.max(10, Math.min(Math.round(thickness * 0.2), Math.round(w * 0.045)))}px`, marginTop: `${Math.round(thickness * 0.25)}px` }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

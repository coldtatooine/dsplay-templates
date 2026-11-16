import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a tweet on the template's blue, with the avatar, the name and the
// handle, and the lines of text that draw themselves one after the other, with their hashtag and their link in the
// template's own colours. Only HTML boxes are animated: the old Android WebViews cannot transform SVG.

const LINES = [
  { width: 100, marks: [{ type: 'hashtag', left: 66, width: 24 }] },
  { width: 90, marks: [{ type: 'link', left: 0, width: 30 }] },
  { width: 55, marks: [] },
];

const px = (value) => `${Math.round(value)}px`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  const avatar = Math.round((size * 0.4) / 2) * 2;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__tweet" style={{ width: px(size * 2), height: px(size * 1.15) }}>
        <span className="intro__avatar" style={{ width: px(avatar), height: px(avatar) }} />
        <span className="intro__name" style={{ left: px(avatar * 1.3), top: px(avatar * 0.12), width: px(size * 0.7), height: px(avatar * 0.3) }} />
        <span className="intro__handle" style={{ left: px(avatar * 1.3), top: px(avatar * 0.6), width: px(size * 0.45), height: px(avatar * 0.2) }} />
        {LINES.map((line, index) => (
          <span
            key={line.width}
            className="intro__line"
            style={{
              top: px(avatar + size * 0.2 + index * size * 0.17),
              width: `${line.width}%`,
              height: px(size * 0.08),
              borderRadius: px(size * 0.04),
              animationDelay: `${index * 0.35}s`,
              WebkitAnimationDelay: `${index * 0.35}s`,
            }}
          >
            {line.marks.map((mark) => (
              <span key={mark.type} className={`intro__mark intro__mark--${mark.type}`} style={{ left: `${mark.left}%`, width: `${mark.width}%` }} />
            ))}
          </span>
        ))}
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(12, size * 0.11)), marginTop: px(size * 0.16) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScreenInfo } from '@dsplay/react-template-utils';
import './style.sass';

// The loader draws what the template is about: a profile (the avatar in a ring that turns, its name) over a photo
// that a light sweeps across, on the template's own purple to coral. Only HTML boxes are animated: the old Android
// WebViews cannot transform SVG.

const px = (value) => `${Math.round(value)}px`;

function Intro(props) {
  const { w, h } = useScreenInfo();
  const { t } = useTranslation();

  const size = useMemo(() => Math.round(Math.min(w, h) / 3), [w, h]);
  const { className } = props;

  const ring = Math.round((size * 0.5) / 2) * 2;
  const avatar = Math.round((ring * 0.82) / 2) * 2;

  return (
    <div {...props} className={`intro ${className || ''}`} role="status">
      <div className="intro__post" style={{ width: px(size * 2), height: px(size * 1.35) }}>
        <span className="intro__ring" style={{ width: px(ring), height: px(ring) }} />
        <span className="intro__avatar" style={{ left: px((ring - avatar) / 2), top: px((ring - avatar) / 2), width: px(avatar), height: px(avatar) }} />
        <span className="intro__name" style={{ left: px(ring + size * 0.14), top: px(ring * 0.22), width: px(size * 0.8), height: px(ring * 0.22) }} />
        <span className="intro__place" style={{ left: px(ring + size * 0.14), top: px(ring * 0.58), width: px(size * 0.5), height: px(ring * 0.16) }} />
        <span className="intro__photo" style={{ top: px(ring + size * 0.12), height: px(size * 1.35 - ring - size * 0.12), borderRadius: px(size * 0.04) }}>
          <span className="intro__shine" />
        </span>
      </div>
      <span className="intro__text" style={{ fontSize: px(Math.max(12, size * 0.11)), marginTop: px(size * 0.16) }}>{t('Loading')}</span>
    </div>
  );
}

export default Intro;

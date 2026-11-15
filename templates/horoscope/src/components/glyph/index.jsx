import { GLYPH } from '../../lib/zodiac';

/** The glyph of a sign, drawn as a static outline (never animated: the old WebViews cannot transform SVG). Its size comes from the stylesheet. */
function Glyph({
  id, className = '', stroke = 'currentColor', strokeWidth = 1.8, label,
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <path d={GLYPH[id]} />
    </svg>
  );
}

export default Glyph;

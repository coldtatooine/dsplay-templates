import { constellationOf } from '../../lib/zodiac';

/**
 * A sign's constellation as static SVG: lines between the stars, each star a white dot with a soft halo. `width` x `height` is the box of the stars and
 * `pad` the room around it (for the halos); the size on screen comes from the stylesheet, the viewBox keeps the proportions.
 */
function Constellation({
  id, width, height, pad = 20, accent, className = '', label,
  lineOpacity = 0.75, lineWidth = 2.2, haloOpacity = 0.28, starScale = 2.4, haloScale = 6,
  starFill = '#ffffff', lineColor, haloFill,
}) {
  const { pts, lines } = constellationOf(id, width, height);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width + pad * 2} ${height + pad * 2}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      {lines.map((l) => (
        <line
          key={`${l.x1}-${l.y1}-${l.x2}-${l.y2}`}
          x1={l.x1 + pad}
          y1={l.y1 + pad}
          x2={l.x2 + pad}
          y2={l.y2 + pad}
          stroke={lineColor || accent}
          strokeOpacity={lineOpacity}
          strokeWidth={lineWidth}
          strokeLinecap="round"
        />
      ))}
      {pts.map((p) => (
        <g key={`${p.x}-${p.y}`}>
          <circle cx={p.x + pad} cy={p.y + pad} r={p.r * starScale} fill={starFill} />
          {haloOpacity > 0 && <circle cx={p.x + pad} cy={p.y + pad} r={p.r * haloScale} fill={haloFill || accent} opacity={haloOpacity} />}
        </g>
      ))}
    </svg>
  );
}

export default Constellation;

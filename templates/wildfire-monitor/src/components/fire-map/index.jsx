import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  dotRadius, mapBounds, maxCount, projection, ringPath,
} from '../main/model';
import './style.sass';

const RECENT = '#ff6a00';
const OLDER = '#ffb300';
const FALLBACK_SIZE = { width: 800, height: 450 };

/** The outlines are big: the world is drawn from the coarse set, a country or a radius from the fine one, loaded when it is needed. */
function useOutlines(fine) {
  const [outlines, setOutlines] = useState(null);
  useEffect(() => {
    let alive = true;
    const load = fine ? import('./outlines-fine.json') : import('./outlines-coarse.json');
    load.then((module) => alive && setOutlines(module.default || module)).catch(() => alive && setOutlines({}));
    return () => {
      alive = false;
    };
  }, [fine]);
  return outlines;
}

/** The size of the box in pixels, measured after the first paint (the loader fades out first) and when the window changes. */
function useBoxSize(box) {
  const [size, setSize] = useState(FALLBACK_SIZE);
  useLayoutEffect(() => {
    const measure = () => {
      if (!box.current) return;
      const { width, height } = box.current.getBoundingClientRect();
      if (width > 0 && height > 0) setSize((old) => (Math.abs(old.width - width) < 1 && Math.abs(old.height - height) < 1 ? old : { width, height }));
    };
    measure();
    const later = setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(later);
      window.removeEventListener('resize', measure);
    };
  }, [box]);
  return size;
}

/**
 * The map of the detections, drawn here: the countries' outlines (Natural Earth, public domain) as flat shapes, the area the answer is about fitted to the box
 * and a dot per cell of the answer, bigger for more detections, orange for a cell with detections in the last 24 hours and amber for one with older ones only.
 * No tiles and no key, so it works with no connection. A radius scope also draws its circle, and a country scope lights its country.
 */
function FireMap({ data, dot }) {
  const box = useRef(null);
  const { width, height } = useBoxSize(box);
  const scope = data.scope || { type: 'world' };
  const outlines = useOutlines(scope.type !== 'world');

  const bounds = mapBounds(data);
  const project = projection(bounds, width, height);
  const points = [...(data.points || [])].sort((a, b) => a.count - b.count);
  const top = maxCount(points);

  return (
    <div className="fire-map" ref={box}>
      <svg className="fire-map__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {outlines && Object.entries(outlines).map(([code, rings]) => (
          <path
            key={code}
            className={`fire-map__land${scope.type === 'country' && scope.country === code ? ' fire-map__land--scope' : ''}`}
            d={rings.map((ring) => ringPath(ring, project, width, height)).join('')}
          />
        ))}
        {scope.type === 'radius' && (
          <circle
            className="fire-map__radius"
            cx={project.x(scope.lon)}
            cy={project.y(scope.lat)}
            r={(scope.radiusKm / 111.32) * project.scale}
          />
        )}
        {points.map((p) => (
          <circle
            key={`${p.lat},${p.lon}`}
            cx={project.x(p.lon)}
            cy={project.y(p.lat)}
            r={dotRadius(p.count, top, dot)}
            fill={p.recent > 0 ? RECENT : OLDER}
            fillOpacity={p.recent > 0 ? 0.75 : 0.45}
          />
        ))}
      </svg>
    </div>
  );
}

export default FireMap;

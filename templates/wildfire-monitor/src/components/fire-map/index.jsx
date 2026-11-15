import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { dotRadius, maxCount, mapBounds } from '../main/model';
import './style.sass';

const TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_CREDIT = '© OpenStreetMap contributors © CARTO';
const RECENT = '#ff6a00';
const OLDER = '#ffb300';

/**
 * The map of the detections: dark tiles, no controls (a screen has no one to use them), the area the answer is about fitted to the box and a dot per cell of
 * the answer, bigger for more detections, orange for a cell with detections in the last 24 hours and amber for one with older ones only. With no tiles (no
 * connection) the dots still draw on the dark box.
 */
function FireMap({ data, dot }) {
  const box = useRef(null);

  useEffect(() => {
    if (!box.current) return undefined;
    const map = L.map(box.current, {
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      zoomSnap: 0.25,
    });
    L.tileLayer(TILES, { attribution: TILE_CREDIT, subdomains: 'abcd', maxZoom: 12 }).addTo(map);
    map.fitBounds(mapBounds(data), { padding: [8, 8] });

    const points = data.points || [];
    const top = maxCount(points);
    // the cells with the most detections last, so that the strongest are on top
    [...points].sort((a, b) => a.count - b.count).forEach((p) => {
      L.circleMarker([p.lat, p.lon], {
        radius: dotRadius(p.count, top, dot),
        stroke: false,
        fillColor: p.recent > 0 ? RECENT : OLDER,
        fillOpacity: p.recent > 0 ? 0.75 : 0.45,
        interactive: false,
      }).addTo(map);
    });

    // the box can be sized after the first paint (the loader fades out first)
    const refit = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(mapBounds(data), { padding: [8, 8] });
    }, 300);
    return () => {
      clearTimeout(refit);
      map.remove();
    };
  }, [data, dot]);

  return <div className="fire-map" ref={box} />;
}

export default FireMap;

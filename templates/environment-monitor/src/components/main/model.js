// Pure helpers for the Main component: what the `environment/1` answer (`media.result`) becomes on screen.

/** Used when the media has no usable duration (it always has one in the player). */
export const FALLBACK_PAGE_MS = 8000;

/**
 * How many rain cards one page holds: the cells of the grid the stylesheet draws (2 columns by 4 rows, or 3 by 3 on a portrait screen), so nothing has to be
 * configured and a page is always full except the last. Where matchMedia is missing (a test) it is the landscape grid.
 */
export function cardsPerPage() {
  const portrait = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(orientation: portrait)').matches;
  return portrait ? 9 : 8;
}

/** The rain cards are paged; every page is shown for the same time, so that the pages together last as long as the media. */
export function pageInterval(durationMs, totalPages) {
  if (!(durationMs > 0) || totalPages < 1) return FALLBACK_PAGE_MS;
  return Math.max(1000, Math.floor(durationMs / totalPages));
}

export const SEVERITY_CLASS = {
  light: 'fraca',
  moderate: 'moderada',
  heavy: 'forte',
  very_heavy: 'muito-forte',
  extreme: 'extrema',
};

/** The English text of each intensity, which is also its translation key (see i18n.js). */
export const SEVERITY_LABELS = {
  fraca: 'Light',
  moderada: 'Moderate',
  forte: 'Heavy',
  'muito-forte': 'Very heavy',
  extrema: 'Extreme',
};

/** The stations that are raining right now (the last hour), in the order the service ranked them. */
export function rainingStations(rainfall) {
  return (rainfall || []).filter((s) => s.last1hMm > 0 && SEVERITY_CLASS[s.intensity]);
}

const RIVER_STATUS_CLASS = { attention: 'pre-alerta', alert: 'alerta', flood: 'enchente' };

/** The card's colour class for a river's status (`normal` has its own). */
export const riverStatusClass = (status) => RIVER_STATUS_CLASS[status] || 'normal';

/** The English text (and translation key) of each banner level. */
export const BANNER_LABELS = { 'pre-alerta': 'Pre-alert', alerta: 'Alert', enchente: 'Flood' };
const ALERT_SEVERITY_CLASS = {
  minor: 'pre-alerta', moderate: 'alerta', severe: 'enchente', extreme: 'enchente', unknown: 'pre-alerta',
};

/**
 * The banner's items: the rivers above their attention level and the weather warnings in effect, most serious first. Each says what to write, not the
 * words: a river is its level's label, its name and its level; a warning is the event as its source wrote it, its first place and how many more.
 */
export function bannerItems(rivers, alerts) {
  const order = { enchente: 3, alerta: 2, 'pre-alerta': 1 };
  const items = [
    ...(rivers || [])
      .filter((r) => RIVER_STATUS_CLASS[r.status])
      .map((r) => ({
        key: `river-${r.id}`,
        status: RIVER_STATUS_CLASS[r.status],
        river: { name: r.river || r.name, levelCm: r.levelCm },
      })),
    ...(alerts || []).map((a) => ({
      key: `alert-${a.id}`,
      status: ALERT_SEVERITY_CLASS[a.severity] || 'pre-alerta',
      alert: { event: a.event, area: a.areas && a.areas.length > 0 ? a.areas[0] : null, more: Math.max(0, (a.areaCount || 0) - 1) },
    })),
  ];
  return items.sort((a, b) => order[b.status] - order[a.status]);
}

/** How full the river's bar is: the level against the highest stage the state sets for it. */
export function riverProgress(river) {
  const { attention, alert, flood } = river.thresholds || {};
  const ref = flood || alert || attention;
  if (!ref || ref <= 0) return river.levelCm > 0 ? 50 : 0;
  return Math.min(100, (river.levelCm / ref) * 100);
}

const SHORT_NAMES = {
  'Agreste Pernambucano': 'Agreste',
  'Mata Pernambucana': 'Mata PE',
  'Metropolitana de Recife': 'RMR',
  'Sertão Pernambucano': 'Sertão',
  'São Francisco Pernambucano': 'S. Francisco',
};

export const shortRegionName = (name) => SHORT_NAMES[name] || name;

/** The credit lines of the sources that served this answer, once each: the data providers ask to be named where their data is shown. */
export function attributions(sources) {
  return [...new Set(Object.values(sources || {}).map((s) => s.attribution && s.attribution.text).filter(Boolean))];
}

/** The names of the sources that served this answer, once each, in the order of the datasets. */
export function sourceNames(sources) {
  return [...new Set(Object.values(sources || {}).map((s) => s.name))];
}

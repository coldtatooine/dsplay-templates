import COUNTRY_NAMES from './country-names';

// Pure helpers for the Main component: what the `wildfire/1` answer (`media.result`) becomes on screen.

/**
 * How many rows of the ranking fit the panel in each format (the service sends the 10 with the most detections): a row is never shown half.
 * 8 in landscape, 10 in portrait, 5 on a square screen, which has less height for the stacked panels.
 */
export const regionsShown = (screenFormat) => {
  if (screenFormat === 'portrait') return 10;
  if (screenFormat === 'square') return 5;
  return 8;
};

/** What the answer brings, so that a panel is drawn only for information that exists. */
export function panelsOf(data) {
  const summary = data && data.summary;
  const regions = (data && data.regions) || [];
  const points = (data && data.points) || [];
  return {
    stats: !!summary,
    regions: regions.length > 0,
    map: points.length > 0 || !!(data && data.scope),
    any: !!summary,
  };
}

/**
 * The change of the last 24 hours against the 24 before, said as a direction and a whole percent. With nothing before there is no percent to give:
 * `new` when there are detections now, `flat` when there are none either way.
 */
export function trend(summary) {
  const now = (summary && summary.last24h) || 0;
  const before = (summary && summary.previous24h) || 0;
  if (before === 0) return { direction: now > 0 ? 'new' : 'flat', percent: null };
  const percent = Math.round(((now - before) / before) * 100);
  if (percent === 0) return { direction: 'flat', percent: 0 };
  return { direction: percent > 0 ? 'up' : 'down', percent: Math.abs(percent) };
}

/** The 27 Brazilian states, the only subdivisions the service ranks today (a proper name is written the same in every language). */
export const BR_STATES = {
  AC: 'Acre',
  AL: 'Alagoas',
  AM: 'Amazonas',
  AP: 'Amapá',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MG: 'Minas Gerais',
  MS: 'Mato Grosso do Sul',
  MT: 'Mato Grosso',
  PA: 'Pará',
  PB: 'Paraíba',
  PE: 'Pernambuco',
  PI: 'Piauí',
  PR: 'Paraná',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RO: 'Rondônia',
  RR: 'Roraima',
  RS: 'Rio Grande do Sul',
  SC: 'Santa Catarina',
  SE: 'Sergipe',
  SP: 'São Paulo',
  TO: 'Tocantins',
};

/** The country in the screen's language when the WebView can say it, else in English, else its code. */
export function countryName(code, language) {
  try {
    if (typeof Intl !== 'undefined' && Intl.DisplayNames) {
      const name = new Intl.DisplayNames([language || 'en'], { type: 'region', fallback: 'code' }).of(code);
      if (name && name !== code) return name;
    }
  } catch {
    // an unknown language or code: the English table answers
  }
  return COUNTRY_NAMES[code] || code;
}

/** `BR` is a country, `BR-PE` a state: the name to draw for a code of the ranking. */
export function regionName(code, language) {
  const [country, subdivision] = code.split('-');
  if (!subdivision) return countryName(country, language);
  return country === 'BR' && BR_STATES[subdivision] ? BR_STATES[subdivision] : subdivision;
}

const KM_PER_DEGREE = 111.32;

/** The box the map shows, `[[south, west], [north, east]]`: the circle of a radius scope, the whole world for the world scope, the points for a country. */
export function mapBounds(data) {
  const scope = (data && data.scope) || { type: 'world' };
  if (scope.type === 'radius') {
    const dLat = scope.radiusKm / KM_PER_DEGREE;
    const dLon = scope.radiusKm / (KM_PER_DEGREE * Math.max(Math.cos((scope.lat * Math.PI) / 180), 0.05));
    return [[scope.lat - dLat, scope.lon - dLon], [scope.lat + dLat, scope.lon + dLon]];
  }
  const points = (data && data.points) || [];
  if (scope.type === 'country' && points.length > 0) {
    const lats = points.map((p) => p.lat);
    const lons = points.map((p) => p.lon);
    return [[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]];
  }
  if (scope.type === 'country') return [[scope.lat - 5, scope.lon - 5], [scope.lat + 5, scope.lon + 5]];
  return [[-58, -170], [75, 170]];
}

/** The radius of a dot on the map, in pixels: the area grows with the number of detections it stands for, between a floor and a ceiling. */
export function dotRadius(count, max, base) {
  const share = max > 0 ? Math.sqrt(count / max) : 0;
  return Math.round((base * (0.35 + 0.65 * share)) * 10) / 10;
}

/** The strongest dot's count, the scale of every dot. */
export const maxCount = (points) => (points || []).reduce((m, p) => Math.max(m, p.count), 0);

/** The title of the area the answer is about: the country, the radius around a place, or the world. */
export function scopeLabel(scope, language, t) {
  if (!scope || scope.type === 'world') return t('The whole world');
  if (scope.type === 'country') return countryName(scope.country, language);
  return t('{{km}} km around the place', { km: scope.radiusKm });
}

/** The sources that gave the data, once each: what the footer credits. */
export function attributions(sources) {
  const seen = new Set();
  return (sources || []).flatMap((source) => {
    if (!source || !source.text || seen.has(source.text)) return [];
    seen.add(source.text);
    return [source.text];
  });
}

/** Whole numbers with thousands separators in the screen's language. */
export const formatCount = (n, language) => Number(n || 0).toLocaleString(language || 'en');

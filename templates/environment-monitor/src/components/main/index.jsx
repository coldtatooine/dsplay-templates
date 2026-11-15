import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMedia } from '@dsplay/react-template-utils';
import {
  BANNER_LABELS,
  SEVERITY_CLASS,
  SEVERITY_LABELS,
  bannerItems,
  cardsPerPage,
  pageInterval,
  rainingStations,
  riverProgress,
  attributions,
  riverStatusClass,
  shortRegionName,
  sourceNames,
} from './model';
import './style.sass';

function formatTime(date, lng) {
  return date.toLocaleTimeString(lng, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatDateTime(date, lng) {
  return date.toLocaleString(lng, {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function Header({ clock, sources }) {
  const { t, i18n } = useTranslation();
  return (
    <header className="dashboard__header">
      <div className="dashboard__title">
        <span className="dashboard__title-main">{t('Weather monitoring')}</span>
        <span className="dashboard__title-sub">{sourceNames(sources).join(' / ')}</span>
      </div>
      <div className="dashboard__clock">{formatTime(clock, i18n.language)}</div>
    </header>
  );
}

function AlertBanner({ items }) {
  const { t } = useTranslation();
  return (
    <div className="alert-banner">
      <span className="alert-banner__icon">⚠</span>
      <div className="alert-banner__list">
        {items.map((item) => (
          <span key={item.key} className={`alert-banner__item alert-banner__item--${item.status}`}>
            {item.river
              ? `${t(BANNER_LABELS[item.status])} — ${item.river.name} (${item.river.levelCm.toFixed(1)} cm)`
              : `${item.alert.event}${item.alert.area ? ` (${item.alert.area}${item.alert.more > 0 ? ` ${t('and {{count}} more', { count: item.alert.more })}` : ''})` : ''}`}
          </span>
        ))}
      </div>
    </div>
  );
}

function StationCard({ station }) {
  const { t, i18n } = useTranslation();
  const severity = SEVERITY_CLASS[station.intensity];
  const label = t(SEVERITY_LABELS[severity]);
  const time = formatTime(new Date(station.observedAt), i18n.language).slice(0, 5);

  return (
    <div className={`station-card station-card--${severity}`}>
      <div className="station-card__bar" />
      <div className="station-card__body">
        <div className="station-card__rain">
          {station.last1hMm.toFixed(1)}
          <span className="station-card__unit">mm</span>
        </div>
        <div className="station-card__label">{label}</div>
        <div className="station-card__name" title={station.name}>{station.name}</div>
        <div className="station-card__meta">
          {station.city && (
            <span className="station-card__city">{station.city}</span>
          )}
          <span className="station-card__org">{station.operator}</span>
          <span className="station-card__time">{time}</span>
        </div>
      </div>
    </div>
  );
}

function RainfallSection({ stations, summary }) {
  const { t } = useTranslation();
  return (
    <div className="rain-section">
      <div className="section-header">
        <span className="section-header__title">{t('Rainfall')}</span>
        <span className="section-header__meta">
          {summary.stationsReporting}
          {' '}
          {t('stations')}
          {' · '}
          {summary.maxLast1hMm > 0 ? t('max {{value}} mm', { value: summary.maxLast1hMm.toFixed(1) }) : t('no rain')}
        </span>
      </div>
      <div className="rain-section__grid">
        {stations.length > 0
          ? stations.map((s) => <StationCard key={s.id} station={s} />)
          : <div className="section-empty">{t('No rain right now')}</div>}
      </div>
    </div>
  );
}

function RiverCard({ river }) {
  return (
    <div className={`river-card river-card--${riverStatusClass(river.status)}`}>
      <div className="river-card__info">
        <span className="river-card__name" title={river.name}>{river.name}</span>
        {river.river && <span className="river-card__rio">{river.river}</span>}
      </div>
      <div className="river-card__right">
        <span className="river-card__nivel">
          {river.levelCm.toFixed(1)}
          <span className="river-card__unit">cm</span>
        </span>
        <div className="river-card__bar-track">
          <div
            className="river-card__bar-fill"
            style={{ width: `${riverProgress(river)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function RiversSection({ rivers }) {
  const { t } = useTranslation();
  return (
    <div className="rivers-section">
      <div className="section-header">
        <span className="section-header__title">{t('River levels')}</span>
        <span className="section-header__meta">
          {rivers.length}
          {' '}
          {t('stations')}
        </span>
      </div>
      <div className="rivers-section__list">
        {rivers.length > 0
          ? rivers.map((r) => <RiverCard key={r.id} river={r} />)
          : <div className="section-empty">{t('No hydrological data')}</div>}
      </div>
    </div>
  );
}

function ConditionCard({ item }) {
  return (
    <div className="meteo-card">
      <div className="meteo-card__name" title={item.name}>{item.name}</div>
      <div className="meteo-card__data">
        <span className="meteo-card__temp">
          {item.temperatureC.toFixed(1)}
          <span className="meteo-card__unit">°C</span>
        </span>
        {item.humidityPct !== null && (
          <span className="meteo-card__umid">
            {Math.round(item.humidityPct)}
            <span className="meteo-card__unit">%</span>
          </span>
        )}
        {item.windKmh > 0 && (
          <span className="meteo-card__vento">
            {item.windKmh.toFixed(1)}
            <span className="meteo-card__unit">km/h</span>
          </span>
        )}
      </div>
    </div>
  );
}

function ConditionsSection({ conditions, summary }) {
  const { t } = useTranslation();
  return (
    <div className="meteo-section">
      <div className="section-header">
        <span className="section-header__title">{t('Weather conditions')}</span>
        <span className="section-header__meta">
          {summary.stations}
          {' '}
          {t('stations')}
        </span>
      </div>
      <div className="meteo-section__grid">
        {conditions.length > 0
          ? conditions.map((c) => <ConditionCard key={c.id} item={c} />)
          : <div className="section-empty">{t('No weather data')}</div>}
      </div>
    </div>
  );
}

function RegionCard({ region }) {
  const { t } = useTranslation();
  const hasTempRange = region.temperatureMinC !== null && region.temperatureMaxC !== null;
  const hasRain = region.rainMm !== null && region.rainMm > 0.05;
  const hasEto = region.etoMm !== null && region.etoMm > 0.05;

  return (
    <div className="meso-card">
      <div className="meso-card__header">
        <span className="meso-card__name">{shortRegionName(region.name)}</span>
        <span className="meso-card__stations">
          {region.stations}
          {' '}
          {t('st.')}
        </span>
      </div>
      <div className="meso-card__temp">
        {region.temperatureNowC !== null ? region.temperatureNowC.toFixed(1) : '—'}
        <span className="meso-card__unit">°C</span>
      </div>
      {hasTempRange && (
        <div className="meso-card__range">
          {region.temperatureMinC.toFixed(1)}
          {'° – '}
          {region.temperatureMaxC.toFixed(1)}
          °
        </div>
      )}
      <div className="meso-card__metrics">
        {region.humidityPct !== null && (
          <span className="meso-card__metric meso-card__metric--rh">
            {t('{{value}}% RH', { value: Math.round(region.humidityPct) })}
          </span>
        )}
        {hasRain && (
          <span className="meso-card__metric meso-card__metric--rain">
            {region.rainMm.toFixed(1)}
            {' mm'}
          </span>
        )}
        {hasEto && (
          <span className="meso-card__metric meso-card__metric--etos">
            {'ETo '}
            {region.etoMm.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}

function ClimateBar({ climate }) {
  const { t } = useTranslation();
  if (climate.length === 0) return null;
  return (
    <div className="climate-bar">
      <span className="climate-bar__label">{t('Region')}</span>
      <div className="climate-bar__cards">
        {climate.map((r) => <RegionCard key={r.id} region={r} />)}
      </div>
    </div>
  );
}

function Footer({
  summary, generatedAt, partial, page, totalPages, credits,
}) {
  const { t, i18n } = useTranslation();
  return (
    <footer className="dashboard__footer">
      <div className="dashboard__legend">
        {Object.entries(SEVERITY_LABELS).map(([key, lbl]) => (
          <span key={key} className={`dashboard__legend-item dashboard__legend-item--${key}`}>
            <span className={`dashboard__legend-dot dashboard__legend-dot--${key}`} />
            <span className="dashboard__legend-label">{t(lbl)}</span>
          </span>
        ))}
      </div>
      <div className="dashboard__footer-center">
        <span className="dashboard__last-update">
          {partial || !generatedAt ? t('Partial update') : formatDateTime(new Date(generatedAt), i18n.language)}
        </span>
        {summary.rainfall && (
          <span className="dashboard__stations-count">
            {t('{{rain}} raining of {{total}}', { rain: summary.rainfall.stationsRaining, total: summary.rainfall.stationsReporting })}
          </span>
        )}
        {credits.length > 0 && (
          <span className="dashboard__attribution">
            {t('Source:')}
            {' '}
            {credits.join(' · ')}
          </span>
        )}
      </div>
      {totalPages > 1 && (
        <div className="dashboard__pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span key={i} className={`dashboard__dot${i === page ? ' dashboard__dot--active' : ''}`} />
          ))}
        </div>
      )}
    </footer>
  );
}

const EMPTY_SUMMARY = { stationsReporting: 0, stationsRaining: 0, maxLast1hMm: null };

/**
 * Shows `media.result`, the `environment/1` answer of the DSPLAY player gateway; nothing is fetched here. The rain cards are paged and every
 * page lasts the media's duration divided by the number of pages. Nothing here is configured: the cards per page come from the grid, the pages from the answer.
 */
function Main() {
  const { duration, result } = useMedia();
  const data = result || {};
  const itemsPerPage = cardsPerPage();

  const [page, setPage] = useState(0);
  const [clock, setClock] = useState(new Date());

  const raining = rainingStations(data.rainfall);
  const totalPages = Math.max(1, Math.ceil(raining.length / itemsPerPage));
  const interval = pageInterval(duration, totalPages);
  const summary = data.summary || {};
  const banner = bannerItems(data.rivers, data.alerts);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (totalPages <= 1) return undefined;
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, interval);
    return () => clearInterval(timer);
  }, [totalPages, interval]);

  const pageStations = raining.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="dashboard">
      <Header clock={clock} sources={data.sources} />
      {banner.length > 0 && <AlertBanner items={banner} />}
      <div className="dashboard__body">
        <div className="dashboard__left">
          {data.rainfall && (
            <RainfallSection stations={pageStations} summary={summary.rainfall || EMPTY_SUMMARY} />
          )}
          {data.rivers && <RiversSection rivers={data.rivers} />}
        </div>
        <div className="dashboard__right">
          {data.conditions && (
            <ConditionsSection conditions={data.conditions} summary={summary.conditions || { stations: data.conditions.length }} />
          )}
        </div>
      </div>
      <ClimateBar climate={data.climate || []} />
      <Footer
        summary={summary}
        generatedAt={data.generatedAt}
        partial={(data.unavailable || []).length > 0}
        page={Math.min(page, totalPages - 1)}
        totalPages={totalPages}
        credits={attributions(data.sources)}
      />
    </div>
  );
}

export default Main;

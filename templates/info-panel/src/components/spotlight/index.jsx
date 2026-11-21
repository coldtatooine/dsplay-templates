import { useEffect, useState } from 'react';
import { useRotation } from '../../lib/rotation';

// The spotlight family (Claude Design canvas, ADR 0070): one widget at a time, with its detail. Markup and class names as in the approved design; style.sass's sibling spotlight.sass has the looks.

const pad = (n) => (n < 10 ? `0${n}` : String(n));
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

const Icon = ({ path, width = 1.9 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
);

const Thermometer = ({ kind }) => (
  <i className={`th ${kind}`}><i className="tube"><i className="mer" /></i><i className="bulb" /></i>
);

/** The clock of the top bar (when the template pins it): the date and the time, ticking every 10 s. */
function PinnedClock({ hour12, timezone, lng }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);
  let date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}`;
  let time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  try {
    const zone = timezone ? { timeZone: timezone } : {};
    date = now.toLocaleDateString(lng, { day: '2-digit', month: 'short', ...zone }).replace(/\./g, '').replace(/\s+de\s+/i, ' ').toUpperCase();
    time = now.toLocaleTimeString(lng, { hour: '2-digit', minute: '2-digit', hour12, ...zone });
  } catch {
    // keeps the numeric date and the plain time
  }
  const [hours, minutes] = time.split(':');
  return <div className="sclock"><span className="sdate">{date}</span><span className="stime">{hours}<span className="blink">:</span>{minutes}</span></div>;
}

/** The little icon of a forecast day, drawn with HTML boxes so it can move (no animation on SVG on Android 4.4): the sun's rays turn, the cloud drifts, the drops fall. */
const DayIcon = ({ day }) => (
  <div className="dwx">
    {day.sun && <i className="dsun"><i className="dspin">{RAYS.map((deg) => <i key={deg} className="dray" style={{ transform: `rotate(${deg}deg)` }} />)}</i><i className="dcore" /></i>}
    {day.cloud && <i className="dcloud"><i className="b" /><i className="c1" /><i className="c2" /></i>}
    {day.drops && <i className="ddrops"><i /><i /><i /></i>}
  </div>
);

function Hero({ s }) {
  if (s.isNews) {
    return (
      <div className={`photo ${s.image ? 'real' : ''}`} style={s.image ? { backgroundImage: `url('${s.image}')` } : undefined}>
        <i className="sun" /><i className="h1" /><i className="h2" /><i className="h3" />
      </div>
    );
  }
  if (s.isWeather) {
    return (
      <div className="bigwx">
        {s.wx !== 'cloud' && s.wx !== 'rain' && s.wx !== 'storm' && s.wx !== 'snow' && s.wx !== 'fog' && (
          <i className="bsun"><i className="spin">{RAYS.map((deg) => <i key={deg} className="ray" style={{ transform: `rotate(${deg}deg)` }} />)}</i><i className="core" /></i>
        )}
        {s.wx !== 'sun' && <i className="bcloud"><i className="cb" /><i className="c1" /><i className="c2" /></i>}
      </div>
    );
  }
  if (s.isQuotes2) {
    return <div className="flags2 a-pop">{s.flag1 && <img className="flag f1" src={s.flag1} alt="" />}{s.flag2 && <img className="flag f2" src={s.flag2} alt="" />}</div>;
  }
  if (s.isHol) return <div className="cal a-pop"><div className="mon">{s.mon}</div><div className="day2">{s.dayNum}</div></div>;
  if (s.isBig) return <div className="bignum a-pop">{s.big}</div>;
  if (s.isClock) return <div className="bigtime a-pop">{s.hours}<span className="blink">:</span>{s.minutes}</div>;
  if (s.isLogo) return <div className="slogo biglogo a-pop"><img src={s.url} alt="" /></div>;
  if (s.isHoro) return <div className="signbox"><div className="sign a-pop"><Icon path={s.icon} /></div><div className="signname a-rise">{s.signName}</div></div>;
  if (s.isJoke) return <div className="bigic a-pop"><Icon path={s.icon} width={1.5} /></div>;
  if (s.isAlert) return <div className="bigic alertic a-pop"><Icon path={s.icon} width={1.6} /></div>;
  return null;
}

function Info({ s }) {
  return (
    <div className="info">
      {s.isQuotes2 && (
        <div className="q2row">
          {s.items.map((it) => (
            <div className="q2" key={it.tagText}>
              <div className="q2m">
                <div className="q2h">{it.flag && <img className="flag" src={it.flag} alt="" />}{it.tagText}{it.full && <span className="q2n">{it.full}</span>}</div>
                <div className="q2p">{it.b}{it.delta && <span className="delta">{it.delta}</span>}</div>
                {it.lo && <div className="q2f">{`Mín ${it.lo} · Máx ${it.hi}`}</div>}
              </div>
              {it.series && (
                <div className={`q2chart ${it.dir}`}>
                  <div className="bars"><svg viewBox="0 0 290 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={it.series} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" /></svg></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {s.hasTag && <div className="tag"><Icon path={s.icon} /><span>{s.tagText}</span></div>}
      {s.isTitled && (
        <>
          <div className="title a-rise">{s.title}</div>
          {s.text && <div className="text a-rise">{s.text}</div>}
        </>
      )}
      {s.isWeather && (
        <>
          <div className="temp">{s.temp}</div>
          {s.text && <div className="text">{s.text}</div>}
        </>
      )}
      {s.hasFacts && (
        <div className="facts" style={{ margin: '0.8em 0 0.5em 0' }}>
          {s.facts.map((f) => <div className="fact a-rise" key={f.k}><small>{f.k}</small>{f.v}</div>)}
        </div>
      )}
      {s.isWeather && s.days.length > 0 && (
        <div className="days">
          {s.days.map((d) => (
            <div className="day a-rise" style={{ animationDelay: d.delay }} key={d.d + d.hi}>
              <small>{d.d}</small>
              <DayIcon day={d} />
              <span className="trow tmax"><Thermometer kind="hi" />{d.hi}</span>
              <span className="trow tmin"><Thermometer kind="lo" />{d.lo}</span>
            </div>
          ))}
        </div>
      )}
      {s.isHol && s.rows.map((r) => (
        <div className="hrow a-rise" style={{ animationDelay: r.delay }} key={r.d + r.m + r.n}>
          <div className="hd">{r.d}<small>{r.m}</small></div><div className="hn">{r.n}</div><div className="hw">{r.w}</div>
        </div>
      ))}
      {s.isJoke && (
        <div className="jsw">
          <div className="title jq">{s.q}</div>
          <div className="title ja">{s.a}</div>
        </div>
      )}
    </div>
  );
}

// how long a slide stays (ms): the media's duration shared among the slides, never more than the maximum nor less than the minimum (a joke has two phases)
const SPOT_DWELL = { min: 5000, max: 12000 };

const LAYOUT = { poster: 'lay-overlay', night: 'lay-overlay', cards: 'lay-side', split: 'lay-side', minimal: 'lay-side' };

/** @param {{spotlight: {slides: object[], pinned: object}, style: string, format: string, lng: string}} props */
export default function Spotlight({
  spotlight, style, format, lng, backgroundStyle, textColor, logoBoxStyle, duration, iteration,
}) {
  const { slides, pinned } = spotlight;
  const { active, phase } = useRotation({ phases: slides.map((s) => (s.isJoke ? 2 : 1)), duration, iteration, ...SPOT_DWELL });
  const hasHead = Boolean(pinned.clock || pinned.logo);
  return (
    <div className={`sp ${format} st-${style} ${LAYOUT[style]} ${hasHead ? 'withhead' : 'nohead'}`} style={{ width: '100%', height: '100%', color: textColor || undefined }}>
      <div className="sbg" style={backgroundStyle} />
      <div className="head">
        {pinned.clock ? <PinnedClock lng={lng} {...pinned.clock} /> : <div />}
        {pinned.logo && <div className="slogo" style={logoBoxStyle}><img src={pinned.logo.url} alt="" /></div>}
      </div>
      <div className="stage">
        {slides.map((s, i) => (
          <div className={`slide sl-${s.kind} ${i === active ? 'on' : ''} ${i === active && phase === 1 ? 'ph1' : ''}`} key={s.key}>
            <div className="hero"><Hero s={s} /></div>
            <Info s={s} />
            <span className="sline">{s.line}</span>
          </div>
        ))}
      </div>
      <div className="foot">
        {slides.map((s, i) => <i key={s.key} className={`dot ${i === active ? 'on' : ''}`} />)}
      </div>
    </div>
  );
}

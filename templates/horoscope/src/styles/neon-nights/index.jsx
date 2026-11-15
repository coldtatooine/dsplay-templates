import { useTranslation } from 'react-i18next';
import Stage from '../../components/stage';
import usePlate from '../../components/stage/use-plate';
import Constellation from '../../components/constellation';
import Meter from '../../components/meter';
import FittedText from '../../components/fitted-text';
import { fitLine, rem } from '../../lib/layout';
import { DISCLAIMER } from '../../lib/labels';
import signView from '../../lib/sign-view';
import './fonts.sass';
import './style.sass';

export const PER_SCREEN = 1;
export const FONTS = ['Orbitron', 'Space Grotesk'];

const NEON = {
  fire: '#ff9a3c', earth: '#4dffa0', air: '#3dd9ff', water: '#9d8bff',
};

const BOX = {
  landscape: { text: { w: 650, h: 300 }, name: 650, nameMax: 92, max: 30, min: 15 },
  portrait: { text: { w: 600, h: 280 }, name: 600, nameMax: 88, max: 32, min: 16 },
  square: { text: { w: 740, h: 150 }, name: 740, nameMax: 72, max: 28, min: 14 },
};

/** The synthwave floor: lines running to a vanishing point at the middle of the plate, and a few across. */
function Grid({ w, h }) {
  const floor = Math.round(h * 0.65);
  const lines = [];
  for (let i = -8; i <= 8; i += 1) lines.push({ x1: w / 2 + i * 20, y1: floor, x2: w / 2 + i * 150, y2: h });
  for (let j = 0; j < 6; j += 1) {
    const y = floor + ((j / 5) ** 1.8) * (h - floor);
    lines.push({ x1: 0, y1: y, x2: w, y2: y, across: true });
  }
  return (
    <svg className="neon__grid" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {lines.map((l) => (
        <line key={`${l.x1}-${l.y1}-${l.x2}-${l.y2}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#7a3cff" strokeWidth="1.4" opacity={l.across ? 0.35 : 0.55} />
      ))}
    </svg>
  );
}

/** One sign in neon on a synthwave night: a glowing name, the constellation inside a pink ring, the scores as light bars. */
function NeonNights({ signs: [sign] }) {
  const { t } = useTranslation();
  const plate = usePlate();
  const { kind } = plate;
  const view = signView(sign, t);
  const neon = NEON[sign.element];
  const box = BOX[kind];

  return (
    <Stage className={`neon neon--${sign.element}`}>
      <Grid w={plate.w} h={plate.h} />
      <div className="neon__art">
        <svg className="neon__ring" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="190" fill="none" stroke="#ff2fb3" strokeWidth="2" opacity="0.5" />
          <circle cx="200" cy="200" r="150" fill="#ff2fb3" opacity="0.08" />
        </svg>
        <Constellation
          id={sign.id}
          width={280}
          height={280}
          pad={30}
          accent={neon}
          label={view.name}
          className="neon__stars"
          lineWidth={3}
          lineOpacity={1}
          haloOpacity={0.35}
          starScale={2}
          haloScale={4.5}
        />
      </div>
      <div className="neon__info">
        <div className="neon__kicker"><span className="neon__square" />{t('Daily horoscope')}</div>
        <h1 className="neon__name" style={{ fontSize: rem(fitLine({ text: view.name, width: box.name, max: box.nameMax, min: 36, charWidth: 0.8 })) }}>{view.name}</h1>
        <div className="neon__meta">
          <span>{view.range}</span>
          {view.keyword && <span className="neon__chip">{view.keyword}</span>}
        </div>
        <div className="neon__body">
          <FittedText text={view.text} width={box.text.w} height={box.text.h} max={box.max} min={box.min} charWidth={0.52} className="neon__text" />
        </div>
      </div>
      <div className="neon__bars">
        <Meter label={t('Love')} value={sign.love} variant="cells" />
        <Meter label={t('Work')} value={sign.work} variant="cells" />
        <Meter label={t('Health')} value={sign.health} variant="cells" />
      </div>
      {sign.luckyNumber !== null && <div className="neon__lucky">{t('Lucky no.')}<div className="neon__number">{sign.luckyNumber}</div></div>}
      <p className="neon__disclaimer">{t(DISCLAIMER)}</p>
    </Stage>
  );
}

export default NeonNights;

import { useEffect, useState } from 'react';
import {
  Loader, useConfig, useMedia, useTemplateVal,
} from '@dsplay/react-template-utils';
import { formatOf, isFlat } from '../../lib/layout';
import { readPanel } from '../../lib/model';
import { lngOf } from '../../lib/strings';
import {
  Clock, Weather, Quotes, Logo, Slide,
} from '../widgets';
import '../../fonts.sass';
import '../../style.sass';

const STYLES = ['classic', 'terminal', 'glass', 'newsroom', 'paper', 'neon'];

// the faces a style draws with, loaded before the template is shown (the bundled ones, see fonts.sass)
const FONTS = {
  classic: [{ family: 'Inter', weight: 700 }],
  glass: [{ family: 'Inter', weight: 700 }],
  terminal: [{ family: 'Inter', weight: 700 }, { family: 'JetBrains Mono', weight: 700 }],
  newsroom: [{ family: 'Inter', weight: 700 }, { family: 'Barlow Condensed', weight: 700 }],
  paper: [{ family: 'Inter', weight: 700 }, { family: 'Newsreader', weight: 700 }],
  neon: [{ family: 'Inter', weight: 700 }, { family: 'Space Grotesk', weight: 700 }],
};

// the biggest and the smallest size of the rotating text, in em of its format's type size (the design's FIT table); the tall banner wraps instead
const FIT = {
  'fmt-slim': { max: 0.78, min: 0.45 }, 'fmt-band': { max: 0.66, min: 0.4 }, 'fmt-landscape': { max: 2.5, min: 0.9 }, 'fmt-square': { max: 2.3, min: 0.9 }, 'fmt-portrait': { max: 2.3, min: 0.9 }, 'fmt-tall': null,
};
// how much of the strip the rotating area may take, by how many other widgets there are (the horizontal bar's rule: the long text never takes the whole banner)
const SHARE = [100, 65, 55, 45, 40];

const windowFormat = () => formatOf(window.innerWidth, window.innerHeight);

function useFormat() {
  const [format, setFormat] = useState(windowFormat);
  useEffect(() => {
    const onResize = () => setFormat(windowFormat());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return format;
}

const boxOf = (backgroundColor, color) => (backgroundColor || color ? { backgroundColor: backgroundColor || undefined, color: color || undefined } : undefined);

function App() {
  const media = useMedia();
  const { locale } = useConfig();
  const lng = lngOf(locale);
  const format = useFormat();
  const styleVar = useTemplateVal('style', 'classic');
  const style = STYLES.includes(styleVar) ? styleVar : 'classic';
  const bgColor = useTemplateVal('bg_color');
  const bgImage = useTemplateVal('bg_image');
  const textColor = useTemplateVal('text_color');
  const unit = useTemplateVal('weather_unit', 'Celsius');
  const quoteBox = boxOf(useTemplateVal('currency_box_color'), useTemplateVal('currency_text_color'));
  const newsBox = boxOf(useTemplateVal('rss_logo_box_color'));
  const logoBox = boxOf(useTemplateVal('sponsor_logo_box_color'));

  const panel = readPanel(media, { lng, iteration: media && media.iteration });
  const flat = isFlat(format);
  const tall = format === 'fmt-tall';
  const fit = FIT[format.split(' ')[0]];

  const bgStyle = {};
  if (bgColor) {
    bgStyle.backgroundColor = bgColor;
    bgStyle.backgroundImage = 'none';
  }
  if (bgImage) {
    bgStyle.backgroundImage = `url('${bgImage}')`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  let content = null;
  if (panel) {
    const { order, widgets, slides, slots } = panel;
    const others = order.filter((k) => k !== 'rot').length;
    const share = SHARE[Math.min(others, 4)];
    const rotStyle = tall ? { maxHeight: `${share}%` } : { maxWidth: `${share}%` };
    const rot = (
      <div key="rot" className={`rot rot-n${Math.min(Math.max(slots, 1), 7)}`} style={flat ? rotStyle : undefined}>
        {slides.map((slide, i) => <Slide key={slide.type + i} slide={slide} fit={fit} newsBoxStyle={newsBox} delay={`${i * 4}s`} />)}
      </div>
    );
    const fixedWidget = (type, index) => (
      <div key={type} className={`w wk-${type}`} style={{ animationDelay: `${index * 0.12}s` }}>
        {type === 'clock' && <Clock lng={lng} {...widgets.clock} />}
        {type === 'weather' && <Weather weather={widgets.weather} unit={unit} tiles={!flat} />}
        {type === 'quotes' && <Quotes quotes={widgets.quotes} boxStyle={quoteBox} />}
      </div>
    );
    const logo = widgets.logo && (
      <div key="logo" className="anchor"><div className="w wk-logo" style={{ animationDelay: '0.5s' }}><Logo url={widgets.logo.url} boxStyle={logoBox} /></div></div>
    );
    if (flat) {
      content = order.map((key, i) => {
        if (key === 'rot') return slides.length ? rot : null;
        if (key === 'logo') return logo;
        return fixedWidget(key, i);
      });
    } else {
      const fixedTypes = order.filter((k) => k !== 'rot' && k !== 'logo');
      content = [<div key="fx" className="fx">{fixedTypes.map(fixedWidget)}</div>, slides.length ? rot : null, logo];
    }
  }

  const rootClass = `ip ${format} st-${style} ${flat ? 'flat' : ''} ${panel && panel.widgets.logo ? 'withlogo' : 'nologo'}`;
  return (
    <Loader reveal fonts={FONTS[style]}>
      <div className={rootClass} style={{ width: '100%', height: '100%', color: textColor || undefined }}>
        <div className="bg" style={bgStyle} />
        {content}
      </div>
    </Loader>
  );
}

export default App;

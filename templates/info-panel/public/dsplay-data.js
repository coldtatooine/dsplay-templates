// The mock data of the dev server (the player replaces this file with the real content before any script runs).
//
// `dsplay_media.result` is what the DSPLAY player gateway answers for an Information panel media: the widgets that play (`order`), split into `fixed` (side by side) and `rotating`
// (taking turns in the long area), and, by id, the body of each widget's own provider. To try another screen from the dev server add ?size=1920x120 (also 1920x81, 1920x56, 1920x240,
// 1080x1080, 1080x1920, 320x1080), ?style=classic|terminal|glass|newsroom|paper|neon, ?locale=en, ?iteration=N (the next headline, joke), ?few=1 (only a clock and the news).
var dsplay_media = {
  duration: 30000,
  iteration: 0,
  result: {
    order: ['clock', 'weather', 'quotes', 'alerts', 'news', 'holidays', 'countdown', 'jokes', 'logo'],
    fixed: ['clock', 'weather', 'quotes', 'logo'],
    rotating: ['alerts', 'news', 'holidays', 'countdown', 'jokes'],
    widgets: {
      clock: { type: 'clock', status: 'ok', data: { hour12: false } },
      weather: {
        type: 'weather',
        status: 'ok',
        data: { unit: 'C', weather: { city: 'São Paulo', country: 'BR', current: { temp: 28, icon: 'c02d', description: 'Parcialmente nublado' } } },
      },
      quotes: {
        type: 'quotes',
        status: 'ok',
        data: { schema: 'currency-quotes/1', base: 'BRL', items: [{ code: 'USD', price: 5.13, changePct: 0.4 }, { code: 'EUR', price: 5.56, changePct: -0.3 }] },
      },
      alerts: {
        type: 'alerts',
        status: 'ok',
        // the alerts active now, worst first; none = the widget is left out. severity: moderate (yellow), severe (orange), extreme (red)
        data: {
          schema: 'alerts/1',
          items: [{ id: 'a1', event: 'Tempestade forte', severity: 'severe', color: null, description: 'Risco de queda de árvores e alagamentos; evite áreas abertas.', areas: ['São Paulo'], areaCount: 1, onset: '2026-11-21T14:00:00', expires: '2026-11-21T18:00:00', sender: 'INMET' }],
        },
      },
      news: {
        type: 'news',
        status: 'ok',
        data: {
          title: 'Notícias',
          items: [
            { title: 'Prefeitura inaugura nova ciclovia na zona sul da cidade', description: 'A obra tem 12 km e liga três bairros; a abertura é neste sábado.' },
            { title: 'Feira de tecnologia reúne mais de 300 expositores', description: 'O evento segue até domingo, com entrada gratuita.' },
          ],
        },
      },
      holidays: {
        type: 'holidays',
        status: 'ok',
        data: { schema: 'holidays/1', date: '2026-11-21', holidays: [{ date: '2026-12-25', name: 'Natal' }, { date: '2027-01-01', name: 'Ano Novo' }] },
      },
      countdown: { type: 'countdown', status: 'ok', data: { date: '2026-11-27T00:00', title: 'a Black Friday' } },
      jokes: {
        type: 'jokes',
        status: 'ok',
        data: { schema: 'jokes/1', jokes: [{ setup: 'Por que o livro de matemática ficou triste?', punchline: 'Porque tinha muitos problemas.' }] },
      },
      logo: { type: 'logo', status: 'ok', data: { url: 'https://developers.dsplay.tv/assets/images/dsplay-logo.png' } },
    },
  },
};

var dsplay_template = {
  // the style: classic, terminal, glass, newsroom, paper or neon
  style: 'classic',
  // the colors every style can take (leave out to keep the style's own)
  // bg_color: '#0b1d3a',
  // bg_image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Gradient_Abstract_Background.jpg',
  // text_color: 'white',
  // currency_box_color: 'white',
  // currency_text_color: '#222',
  // rss_logo_box_color: 'white',
  // sponsor_logo_box_color: 'white',
};

var dsplay_config = {
  locale: 'pt_br',
  orientation: 'landscape',
  osVersion: 16,
  appVersion: 99,
};

// Dev server only: the page's own address picks the screen.
(function () {
  var params = new URLSearchParams(window.location.search);
  var style = params.get('style');
  if (style) dsplay_template.style = style;
  var locale = params.get('locale');
  if (locale) dsplay_config.locale = locale;
  var iteration = params.get('iteration');
  if (iteration) dsplay_media.iteration = Number(iteration);
  var sev = params.get('sev');
  if (sev) dsplay_media.result.widgets.alerts.data.items[0].severity = sev;
  var only = params.get('only');
  if (only) {
    var r = dsplay_media.result;
    r.order = [only];
    r.fixed = r.fixed.indexOf(only) >= 0 ? [only] : [];
    r.rotating = r.rotating.indexOf(only) >= 0 ? [only] : [];
  }
  if (params.get('few')) {
    dsplay_media.result.order = ['clock', 'news'];
    dsplay_media.result.fixed = ['clock'];
    dsplay_media.result.rotating = ['news'];
  }
}());

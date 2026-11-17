// Drawn on the "Template loaders" board: three day tiles, the long weekend, that jump one after the other, on the style's deep green. Plain ES5 on purpose.
function an(name, dur, ease, delay) {
  var value = 'intro-' + name + ' ' + dur + 's ' + (ease || 'ease-in-out') + ' infinite ' + (delay || 0) + 's';
  return '-webkit-animation:' + value + ';animation:' + value + ';';
}
function prefixed(css) {
  return css.replace(/(^|;)(transform-origin|transform)(:[^;]*)/g, '$1-webkit-$2$3;$2$3');
}
function box(css, inner, cls) {
  return '<div' + (cls ? ' class="' + cls + '"' : '') + ' style="' + prefixed(css) + '">' + (inner || '') + '</div>';
}
function p(m, x) { return Math.round(m * x); }
function mark(m) {
  var tile = p(m, 0.34);
  var gap = p(m, 0.1);
  var tiles = '';
  for (var i = 0; i < 3; i += 1) {
    tiles += box('position:absolute;left:' + (i * (tile + gap)) + 'px;top:' + p(m, 0.12) + 'px;width:' + tile + 'px;height:' + p(m, 0.5) + 'px;border-radius:' + p(m, 0.1) + 'px;background:' + (i === 1 ? '#ffd23f' : '#d8f3ea') + ';' + an('bounce', 1.5, 'ease-in-out', -(i * 0.25)));
  }
  return box('position:relative;width:' + (3 * tile + 2 * gap) + 'px;height:' + p(m, 0.9) + 'px;', tiles);
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#064e3b' } };

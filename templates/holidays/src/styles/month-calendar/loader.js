// Drawn on the "Template loaders" board: a calendar page whose day squares light up one after the other, on the style's pale blue. Plain ES5 on purpose.
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
  var cell = p(m, 0.22);
  var gap = p(m, 0.06);
  var cells = '';
  for (var i = 0; i < 6; i += 1) {
    cells += box('position:absolute;left:' + (p(m, 0.06) + (i % 3) * (cell + gap)) + 'px;top:' + (p(m, 0.36) + Math.floor(i / 3) * (cell + gap)) + 'px;width:' + cell + 'px;height:' + cell + 'px;border-radius:' + p(m, 0.05) + 'px;background:#e8505b;' + an('light', 1.8, 'ease-in-out', -(i * 0.3)));
  }
  return box('position:relative;width:' + p(m, 0.9) + 'px;height:' + p(m, 0.9) + 'px;border-radius:' + p(m, 0.14) + 'px;background:#1d3a6b;',
    box('position:absolute;left:0;top:0;width:' + p(m, 0.9) + 'px;height:' + p(m, 0.24) + 'px;border-radius:' + p(m, 0.14) + 'px ' + p(m, 0.14) + 'px 0 0;background:#2f5aa8;') + cells);
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#eef3fb' } };

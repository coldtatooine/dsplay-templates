// Drawn on the "Template loaders" board: three list rows that light up in turn, on the style's graphite. Plain ES5 on purpose.
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
  var rows = '';
  for (var i = 0; i < 3; i += 1) {
    rows += box('position:absolute;left:0;top:' + (i * p(m, 0.34)) + 'px;width:' + p(m, 1.1) + 'px;height:' + p(m, 0.24) + 'px;border-radius:' + p(m, 0.08) + 'px;background:#3a4256;' + an('light', 1.8, 'ease-in-out', -(i * 0.5)),
      box('position:absolute;left:' + p(m, 0.05) + 'px;top:' + p(m, 0.05) + 'px;width:' + p(m, 0.14) + 'px;height:' + p(m, 0.14) + 'px;border-radius:' + p(m, 0.04) + 'px;background:#f6b94c;') +
      box('position:absolute;left:' + p(m, 0.28) + 'px;top:' + p(m, 0.09) + 'px;width:' + p(m, 0.6) + 'px;height:' + p(m, 0.06) + 'px;border-radius:' + p(m, 0.03) + 'px;background:#e6e9f2;'));
  }
  return box('position:relative;width:' + p(m, 1.1) + 'px;height:' + p(m, 0.92) + 'px;', rows);
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#14171f' } };

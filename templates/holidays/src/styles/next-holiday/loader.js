// Drawn on the "Template loaders" board: a countdown ring, one small mark on the style's navy. Plain ES5 on purpose: the string it returns is what an Android 4.4 WebView paints.
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
  var ring = p(m, 1);
  var thick = Math.max(2, p(m, 0.09));
  return box('position:relative;width:' + ring + 'px;height:' + ring + 'px;',
    box('position:absolute;left:0;top:0;width:' + ring + 'px;height:' + ring + 'px;border-radius:50%;border:' + thick + 'px solid #ffb454;border-top-color:transparent;border-right-color:rgba(255,180,84,.35);' + an('spin', 1.6, 'linear')) +
    box('position:absolute;left:' + p(m, 0.5 - 0.09) + 'px;top:' + p(m, 0.5 - 0.09) + 'px;width:' + p(m, 0.18) + 'px;height:' + p(m, 0.18) + 'px;border-radius:50%;background:#ffb454;' + an('pulse', 1.6, 'ease-in-out')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#0a1522' } };

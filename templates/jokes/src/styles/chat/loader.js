// Generated from the approved loader design board: one small mark, drawn as HTML boxes (a still SVG inside a box where a logo is needed).
// Plain ES5 on purpose: the string it returns is what an Android 4.4 WebView paints.
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
  return box('position:relative;width:' + p(m, 1.1) + 'px;height:' + p(m, 0.86) + 'px;',
    box('position:absolute;left:0;top:0;width:' + p(m, 0.7) + 'px;height:' + p(m, 0.34) + 'px;border-radius:' + p(m, 0.17) + 'px;background:#b9d9f2;' + an('light', 1.6, 'ease-in-out')) +
    box('position:absolute;right:0;top:' + p(m, 0.46) + 'px;width:' + p(m, 0.7) + 'px;height:' + p(m, 0.34) + 'px;border-radius:' + p(m, 0.17) + 'px;background:#4ade80;' + an('light', 1.6, 'ease-in-out', -0.8)));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#e7f6ff' } };

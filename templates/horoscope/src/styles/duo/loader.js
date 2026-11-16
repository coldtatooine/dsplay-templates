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
  var d = p(m, 0.62);
  return box('position:relative;width:' + m + 'px;height:' + d + 'px;',
    box('position:absolute;left:' + p(m, 0.04) + 'px;top:0;width:' + d + 'px;height:' + d + 'px;border-radius:50%;background:#0d1030;border:' + p(m, 0.03) + 'px solid #aab2d5;box-sizing:border-box;' + an('dua', 1.8)) +
    box('position:absolute;right:' + p(m, 0.04) + 'px;top:0;width:' + d + 'px;height:' + d + 'px;border-radius:50%;background:#eef1fb;border:' + p(m, 0.03) + 'px solid #0d1030;box-sizing:border-box;' + an('dub', 1.8)));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#eef1fb', image: 'linear-gradient(90deg,#eef1fb 50%,#0d1030 50%)' } };

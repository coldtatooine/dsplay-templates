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
function dots(m, colors, size, anim, dur, step) {
  var s = '';
  for (var i = 0; i < colors.length; i++) {
    s += box('display:inline-block;width:' + Math.round(m * size) + 'px;height:' + Math.round(m * size) + 'px;margin:0 ' + Math.round(m * 0.07) + 'px;border-radius:50%;background:' + colors[i] + ';' + an(anim, dur, 'ease-in-out', -i * step));
  }
  return '<div style="white-space:nowrap;line-height:0">' + s + '</div>';
}
function mark(m) {
  return box('position:relative;width:' + p(m, 1.1) + 'px;height:' + p(m, 0.74) + 'px;border-radius:' + p(m, 0.24) + 'px;background:#fff;' + an('wob', 1.8),
    '<div style="position:absolute;left:0;right:0;top:' + p(m, 0.22) + 'px;text-align:center">' + dots(m, ['#3a2a00', '#3a2a00', '#3a2a00'], 0.12, 'bounce', 0.9, 0.15) + '</div>' +
    box('position:absolute;left:' + p(m, 0.2) + 'px;bottom:-' + p(m, 0.14) + 'px;width:0;height:0;border-left:' + p(m, 0.1) + 'px solid transparent;border-right:' + p(m, 0.1) + 'px solid transparent;border-top:' + p(m, 0.18) + 'px solid #fff;'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#ffd84d' } };

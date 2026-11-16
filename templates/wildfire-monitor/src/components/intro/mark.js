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
function mark(m) {
  var f = Math.round(m * 0.56), g = Math.round(m * 0.3);
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;transform-origin:50% 90%;' + an('flick', 1.1),
    box('position:absolute;left:' + Math.round((m - f) / 2) + 'px;top:' + Math.round(m * 0.3) + 'px;width:' + f + 'px;height:' + f + 'px;border-radius:50% 0 50% 50%;transform:rotate(-45deg);background:#ff6a00;') +
    box('position:absolute;left:' + Math.round((m - g) / 2) + 'px;top:' + Math.round(m * 0.52) + 'px;width:' + g + 'px;height:' + g + 'px;border-radius:50% 0 50% 50%;transform:rotate(-45deg);background:#ffb300;'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

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
  return box('position:relative;width:' + Math.round(m * 0.8) + 'px;height:' + Math.round(m * 0.5) + 'px;border-radius:' + Math.round(m * 0.08) + 'px;background:#d8d4c9;transform-origin:' + Math.round(m * 0.12) + 'px ' + Math.round(m * 0.25) + 'px;' + an('wob', 1.6),
    box('position:absolute;left:' + Math.round(m * 0.07) + 'px;top:' + Math.round(m * 0.19) + 'px;width:' + Math.round(m * 0.12) + 'px;height:' + Math.round(m * 0.12) + 'px;border-radius:50%;background:#282828;') +
    box('position:absolute;left:' + Math.round(m * 0.3) + 'px;top:' + Math.round(m * 0.17) + 'px;width:' + Math.round(m * 0.36) + 'px;height:' + Math.round(m * 0.07) + 'px;border-radius:2px;background:#3a3a3a;') +
    box('position:absolute;left:' + Math.round(m * 0.3) + 'px;top:' + Math.round(m * 0.3) + 'px;width:' + Math.round(m * 0.24) + 'px;height:' + Math.round(m * 0.07) + 'px;border-radius:2px;background:#587e91;'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

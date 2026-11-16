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
  return box('position:relative;width:' + Math.round(m * 1.1) + 'px;height:' + Math.round(m * 0.5) + 'px;' + an('slide', 1.4),
    box('position:absolute;left:0;top:' + Math.round(m * 0.18) + 'px;width:' + Math.round(m * 0.72) + 'px;height:' + Math.round(m * 0.14) + 'px;background:#161616;') +
    box('position:absolute;left:' + Math.round(m * 0.7) + 'px;top:0;width:0;height:0;border-top:' + Math.round(m * 0.25) + 'px solid transparent;border-bottom:' + Math.round(m * 0.25) + 'px solid transparent;border-left:' + Math.round(m * 0.34) + 'px solid #161616;'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

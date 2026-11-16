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
function line(m, wid, color, delay, dur, h) {
  return box('width:' + Math.round(m * wid) + 'px;height:' + Math.round(m * (h || 0.09)) + 'px;margin:' + Math.round(m * 0.07) + 'px auto;border-radius:' + Math.round(m * 0.05) + 'px;background:' + color + ';transform-origin:0 50%;' + an('fill', dur || 1.6, 'ease-in-out', delay || 0));
}
function mark(m) { return '<div style="width:' + Math.round(m * 1.1) + 'px">' + line(m, 1.1, 'rgba(255,255,255,.85)', 0, 1.8) + line(m, 0.7, 'rgba(255,255,255,.85)', 0.35, 1.8) + '</div>'; }

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

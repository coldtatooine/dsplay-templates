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
  var d1 = Math.round(m * 0.5), d2 = Math.round(m * 0.9), bw = Math.round(m * 0.1);
  function arc(d, delay) { return box('position:absolute;left:0;bottom:0;width:' + d + 'px;height:' + d + 'px;box-sizing:border-box;border-top:' + bw + 'px solid #f78422;border-right:' + bw + 'px solid #f78422;border-top-right-radius:100%;' + an('light', 1.4, 'ease-in-out', delay)); }
  return box('position:relative;width:' + d2 + 'px;height:' + d2 + 'px;',
    box('position:absolute;left:0;bottom:0;width:' + Math.round(m * 0.18) + 'px;height:' + Math.round(m * 0.18) + 'px;border-radius:50%;background:#f78422;') + arc(d1, -0.7) + arc(d2, -0.35));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

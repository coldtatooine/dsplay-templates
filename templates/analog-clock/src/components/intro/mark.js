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
function hand(m, len, w, color, dur, delay) {
  var h = Math.round(m * len), ww = Math.max(2, Math.round(m * w));
  return box('position:absolute;left:0;top:0;width:100%;height:100%;' + an('spin', dur, 'linear', delay || 0),
    box('position:absolute;left:50%;bottom:50%;margin-left:-' + Math.round(ww / 2) + 'px;width:' + ww + 'px;height:' + h + 'px;background:' + color + ';border-radius:' + ww + 'px;'));
}
function mark(m) {
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;border-radius:50%;box-sizing:border-box;border:' + p(m, 0.06) + 'px solid #fff;', hand(m, 0.34, 0.06, '#fff', 1.5) + hand(m, 0.22, 0.06, '#fff', 18));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

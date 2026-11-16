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
function hand(m, len, w, color, dur, delay) {
  var h = Math.round(m * len), ww = Math.max(2, Math.round(m * w));
  return box('position:absolute;left:0;top:0;width:100%;height:100%;' + an('spin', dur, 'linear', delay || 0),
    box('position:absolute;left:50%;bottom:50%;margin-left:-' + Math.round(ww / 2) + 'px;width:' + ww + 'px;height:' + h + 'px;background:' + color + ';border-radius:' + ww + 'px;'));
}
function face(m, bg, ring, hands) {
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;border-radius:50%;background:' + bg + ';border:' + Math.max(2, Math.round(m * 0.04)) + 'px solid ' + ring + ';box-sizing:border-box;', hands +
    box('position:absolute;left:50%;top:50%;width:' + Math.round(m * 0.09) + 'px;height:' + Math.round(m * 0.09) + 'px;margin:-' + Math.round(m * 0.045) + 'px 0 0 -' + Math.round(m * 0.045) + 'px;border-radius:50%;background:#fff;'));
}
function mark(m) {
  var s = Math.round(m * 0.42), out = '';
  for (var i = 0; i < 3; i++) out += '<div style="display:inline-block;margin:0 ' + Math.round(m * 0.04) + 'px">' + face(s, '#3a3d41', '#888', hand(s, 0.36, 0.06, '#fff', 12, -i * 3) + hand(s, 0.42, 0.04, '#cd6a51', 1.5, -i * 0.5)) + '</div>';
  return '<div style="white-space:nowrap;line-height:0">' + out + '</div>';
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

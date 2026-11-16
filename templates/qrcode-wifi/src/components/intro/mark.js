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
function svgI(m, vb, inner) {
  return '<div style="display:block;line-height:0"><svg width="' + m + '" height="' + m + '" viewBox="0 0 ' + vb + ' ' + vb + '" overflow="visible">' + inner + '</svg></div>';
}
function lay(css, inner) { return box('position:absolute;left:0;top:0;width:100%;height:100%;' + css, inner); }
function mark(m) {
  function arc(r, delay) {
    var a = (12 - r * 0.7071).toFixed(2), b = (12 + r * 0.7071).toFixed(2), y = (19 - r * 0.7071).toFixed(2);
    return lay(an('light', 1.5, 'ease-in-out', delay), svgI(m, 24, '<path d="M' + a + ' ' + y + ' A' + r + ' ' + r + ' 0 0 1 ' + b + ' ' + y + '" fill="none" stroke="#434040" stroke-width="2.4" stroke-linecap="round"/>'));
  }
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;', arc(4.4, -1) + arc(8.6, -0.5) + arc(12.8, 0) +
    lay('', svgI(m, 24, '<circle cx="12" cy="19" r="1.7" fill="#434040"/>')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

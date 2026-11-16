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
function p(m, x) { return Math.round(m * x); }
function mark(m) {
  var rays = '';
  for (var i = 0; i < 8; i++) rays += '<line x1="12" y1="1.6" x2="12" y2="4" stroke="#ffe27a" stroke-width="1.6" stroke-linecap="round" transform="rotate(' + i * 45 + ' 12 12)"/>';
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;',
    box('position:absolute;left:0;top:0;width:' + p(m, 0.78) + 'px;height:' + p(m, 0.78) + 'px;' + an('spin', 9, 'linear'),
      svgI(p(m, 0.78), 24, '<circle cx="12" cy="12" r="5.2" fill="#ffd84a"/>' + rays)) +
    box('position:absolute;right:0;bottom:' + p(m, 0.04) + 'px;width:' + p(m, 0.72) + 'px;height:' + p(m, 0.72) + 'px;' + an('drift', 3.2),
      svgI(p(m, 0.72), 24, '<path d="M6.5 19a4.5 4.5 0 0 1-.4-8.98 6 6 0 0 1 11.5 1.5A3.7 3.7 0 0 1 17 19z" fill="#fff"/>')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

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
function igLogo(m) {
  return svgI(m, 24, '<defs><linearGradient id="igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#fcb045"/><stop offset=".5" stop-color="#fd1d1d"/><stop offset="1" stop-color="#833ab4"/></linearGradient></defs>' +
    '<rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#igg)"/><rect x="5.6" y="5.6" width="12.8" height="12.8" rx="4" fill="none" stroke="#fff" stroke-width="1.7"/>' +
    '<circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="16.4" cy="7.6" r="1" fill="#fff"/>');
}
function mark(m) {
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;', igLogo(m) +
    box('position:absolute;left:' + p(m, 0.64) + 'px;top:' + p(m, 0.24) + 'px;width:' + p(m, 0.16) + 'px;height:' + p(m, 0.16) + 'px;border-radius:50%;background:#fff;' + an('blink', 1, 'ease-in-out')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

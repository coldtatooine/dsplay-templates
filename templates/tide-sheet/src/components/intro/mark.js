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
  return box('position:relative;overflow:hidden;width:' + m + 'px;height:' + m + 'px;border-radius:50%;background:#101d45;border:' + Math.round(m * 0.04) + 'px solid #5fb4ff;box-sizing:border-box;',
    box('position:absolute;left:' + Math.round(m * 0.5) + 'px;top:' + Math.round(m * 0.14) + 'px;width:' + Math.round(m * 0.26) + 'px;height:' + Math.round(m * 0.26) + 'px;border-radius:50%;background:#ffe9a8;') +
    box('position:absolute;left:-10%;top:55%;width:120%;height:70%;background:#2d889b;' + an('tide', 2.2)));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

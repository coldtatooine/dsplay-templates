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
  var drops = '';
  for (var i = 0; i < 3; i++) drops += box('position:absolute;left:' + Math.round(m * (0.22 + i * 0.22)) + 'px;top:' + Math.round(m * 0.52) + 'px;width:' + Math.round(m * 0.09) + 'px;height:' + Math.round(m * 0.16) + 'px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#29b6f6;' + an('fall', 1.3, 'ease-in', -i * 0.4));
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;',
    box('position:absolute;left:' + Math.round(m * 0.08) + 'px;top:' + Math.round(m * 0.26) + 'px;width:' + Math.round(m * 0.84) + 'px;height:' + Math.round(m * 0.3) + 'px;border-radius:' + Math.round(m * 0.15) + 'px;background:#a9c6e0;') +
    box('position:absolute;left:' + Math.round(m * 0.22) + 'px;top:' + Math.round(m * 0.12) + 'px;width:' + Math.round(m * 0.34) + 'px;height:' + Math.round(m * 0.34) + 'px;border-radius:50%;background:#a9c6e0;') +
    box('position:absolute;left:' + Math.round(m * 0.46) + 'px;top:' + Math.round(m * 0.18) + 'px;width:' + Math.round(m * 0.28) + 'px;height:' + Math.round(m * 0.28) + 'px;border-radius:50%;background:#a9c6e0;') + drops);
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

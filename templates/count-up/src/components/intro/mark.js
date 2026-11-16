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
function mark(m) {
  var w = p(m, 0.78), h = p(m, 1), digits = ['0', '1', '2', '3'], col = '';
  for (var i = 0; i < digits.length; i++) col += box('height:' + h + 'px;line-height:' + h + 'px;text-align:center;', digits[i]);
  return box('position:relative;width:' + w + 'px;height:' + h + 'px;overflow:hidden;border-radius:' + p(m, 0.1) + 'px;background:#2a2a2e;color:#fff;font:bold ' + p(m, 0.74) + 'px/' + h + 'px \'Helvetica Neue\',Arial,sans-serif;',
    box('' + an('reel', 2.4, 'steps(4, end)'), col));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

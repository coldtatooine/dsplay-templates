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
function bars(m, n, color, w, gap, dur) {
  var s = '';
  for (var i = 0; i < n; i++) {
    s += box('display:inline-block;width:' + Math.round(m * w) + 'px;height:' + Math.round(m * 0.7) + 'px;margin:0 ' + Math.round(m * gap) + 'px;border-radius:' + Math.round(m * w) + 'px;background:' + color + ';' + an('bar', dur, 'ease-in-out', -i * dur / n));
  }
  return '<div style="white-space:nowrap;line-height:0">' + s + '</div>';
}
function mark(m) { return bars(m, 5, '#03a064', 0.1, 0.045, 1.1); }

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

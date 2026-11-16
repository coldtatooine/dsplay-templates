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
function lay(css, inner) { return box('position:absolute;left:0;top:0;width:100%;height:100%;' + css, inner); }
function mark(m) {
  var s = '', n = 8, r = m * 0.42, d = p(m, 0.14);
  for (var i = 0; i < n; i++) {
    var a = 2 * Math.PI * i / n;
    s += box('position:absolute;left:' + Math.round(m / 2 + r * Math.cos(a) - d / 2) + 'px;top:' + Math.round(m / 2 + r * Math.sin(a) - d / 2) + 'px;width:' + d + 'px;height:' + d + 'px;border-radius:50%;background:#ffd84d;' + an('light', 1.2, 'ease-in-out', -i * 1.2 / n));
  }
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;', s +
    lay('', svgI(m, 24, '<path d="M8.8 9.4A3.3 3.3 0 1 1 12.9 12.5c-.8.5-1 1.2-1 2.3M12 18v.1" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#1b2a6b' } };

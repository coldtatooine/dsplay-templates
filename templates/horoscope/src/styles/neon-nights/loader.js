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
function starPts(n, r1, r2, cx, cy) {
  var pts = [];
  for (var i = 0; i < n * 2; i++) {
    var r = i % 2 === 0 ? r1 : r2, a = Math.PI * i / n - Math.PI / 2;
    pts.push((cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2));
  }
  return pts.join(' ');
}
function mark(m) {
  var points = starPts(5, 11, 4.6, 12, 12.6);
  return box('width:' + m + 'px;height:' + m + 'px;' + an('pulse', 1.5),
    svgI(m, 24, '<polygon points="' + points + '" fill="none" stroke="#ff9a3c" stroke-opacity=".3" stroke-width="3.6" stroke-linejoin="round"/><polygon points="' + points + '" fill="none" stroke="#ff9a3c" stroke-width="1.5" stroke-linejoin="round"/>'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#1a0638' } };

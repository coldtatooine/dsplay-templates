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
  var w = p(m, 0.56), h = p(m, 0.36), cap = p(m, 0.07);
  function tri(top, css) {
    return box('position:absolute;left:0;' + (top ? 'top:' + cap + 'px;' : 'top:' + (cap + h) + 'px;') + 'width:0;height:0;border-left:' + Math.round(w / 2) + 'px solid transparent;border-right:' + Math.round(w / 2) + 'px solid transparent;' + (top ? 'border-top:' : 'border-bottom:') + h + 'px solid #fff;' + css);
  }
  return box('position:relative;width:' + w + 'px;height:' + (2 * h + 2 * cap) + 'px;' + an('flipglass', 3.2, 'ease-in-out'),
    box('position:absolute;left:-' + p(m, 0.06) + 'px;top:0;width:' + (w + p(m, 0.12)) + 'px;height:' + cap + 'px;border-radius:' + cap + 'px;background:#fff;') +
    tri(true, an('sandtop', 3.2, 'linear')) + tri(false, an('sandbot', 3.2, 'linear')) +
    box('position:absolute;left:0;bottom:0;width:' + (w + 0) + 'px;height:0;') +
    box('position:absolute;left:-' + p(m, 0.06) + 'px;bottom:0;width:' + (w + p(m, 0.12)) + 'px;height:' + cap + 'px;border-radius:' + cap + 'px;background:#fff;'));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

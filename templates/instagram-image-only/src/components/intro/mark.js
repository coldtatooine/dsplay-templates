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
  var lens = p(m, 0.42);
  return box('position:relative;width:' + m + 'px;height:' + m + 'px;border-radius:' + p(m, 0.26) + 'px;background:linear-gradient(45deg,#fcb045,#fd1d1d,#833ab4);',
    box('position:absolute;left:' + p(m, 0.16) + 'px;top:' + p(m, 0.16) + 'px;width:' + p(m, 0.68) + 'px;height:' + p(m, 0.68) + 'px;border-radius:' + p(m, 0.18) + 'px;box-sizing:border-box;border:' + p(m, 0.06) + 'px solid #fff;') +
    box('position:absolute;left:' + Math.round((m - lens) / 2) + 'px;top:' + Math.round((m - lens) / 2) + 'px;width:' + lens + 'px;height:' + lens + 'px;border-radius:50%;box-sizing:border-box;border:' + p(m, 0.06) + 'px solid #fff;' + an('pulse', 1.4)) +
    box('position:absolute;left:' + p(m, 0.64) + 'px;top:' + p(m, 0.24) + 'px;width:' + p(m, 0.1) + 'px;height:' + p(m, 0.1) + 'px;border-radius:50%;background:#fff;' + an('blink', 1, 'ease-in-out')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export { markSize };
export default mark;

// Drawn on the "Template loaders" board: a poster page, a rounded sheet with a star that pulses, on black (the poster's colour changes with the day). Plain ES5 on purpose.
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
  var star = p(m, 0.3);
  return box('position:relative;width:' + p(m, 0.7) + 'px;height:' + p(m, 0.92) + 'px;border-radius:' + p(m, 0.1) + 'px;background:#ff7a1a;',
    box('position:absolute;left:' + p(m, 0.1) + 'px;top:' + p(m, 0.12) + 'px;width:' + p(m, 0.5) + 'px;height:' + p(m, 0.07) + 'px;border-radius:' + p(m, 0.035) + 'px;background:rgba(255,255,255,.7);') +
    box('position:absolute;left:' + p(m, 0.1) + 'px;top:' + p(m, 0.24) + 'px;width:' + p(m, 0.36) + 'px;height:' + p(m, 0.07) + 'px;border-radius:' + p(m, 0.035) + 'px;background:rgba(255,255,255,.7);') +
    box('position:absolute;left:' + p(m, 0.2) + 'px;top:' + p(m, 0.5) + 'px;width:' + star + 'px;height:' + star + 'px;border-radius:' + p(m, 0.09) + 'px;background:#fff;' + an('pulse', 1.6, 'ease-in-out')));
}

// The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
function markSize(w, h) {
  var banner = w / h >= 3 || h / w >= 3;
  return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
}

export default { mark, markSize, background: { color: '#000000' } };

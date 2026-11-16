// Generated from the approved loader design board: one small mark, drawn as HTML boxes, centred in #overlay.
// Plain ES5 on purpose: the string it draws is what an Android 4.4 WebView paints.
(function () {
  'use strict';

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
  function mark(m) {
    return box('width:' + m + 'px;height:' + m + 'px;border-radius:50%;background:#f2c14e;' + an('coin', 1.4),
      svgI(m, 24, '<path d="M15.6 8.4c0-1.7-1.6-2.7-3.6-2.7s-3.6 1-3.6 2.7c0 1.8 1.6 2.4 3.6 3.1s3.6 1.3 3.6 3.1c0 1.7-1.6 2.7-3.6 2.7s-3.6-1-3.6-2.7M12 3.6v16.8" fill="none" stroke="#0c3b2e" stroke-width="2.1" stroke-linecap="round"/>'));
  }

  // The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
  function markSize(w, h) {
    var banner = w / h >= 3 || h / w >= 3;
    return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
  }

  var overlay = document.getElementById('overlay');
  overlay.innerHTML = mark(markSize(window.innerWidth, window.innerHeight));
}());

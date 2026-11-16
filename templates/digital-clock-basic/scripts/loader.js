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
  function p(m, x) { return Math.round(m * x); }
  function mark(m) {
    var s = p(m, 0.24);
    return box('', box('width:' + s + 'px;height:' + s + 'px;margin:0 auto ' + p(m, 0.26) + 'px;border-radius:' + p(m, 0.04) + 'px;background:#7fd6ff;' + an('light', 1.2, 'ease-in-out')) +
      box('width:' + s + 'px;height:' + s + 'px;margin:0 auto;border-radius:' + p(m, 0.04) + 'px;background:#7fd6ff;' + an('light', 1.2, 'ease-in-out', -0.6)));
  }

  // The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
  function markSize(w, h) {
    var banner = w / h >= 3 || h / w >= 3;
    return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
  }

  var overlay = document.getElementById('overlay');
  overlay.innerHTML = mark(markSize(window.innerWidth, window.innerHeight));
}());

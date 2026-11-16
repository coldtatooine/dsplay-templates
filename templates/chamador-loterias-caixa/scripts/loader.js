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
  function mark(m) {
    return box('position:relative;width:' + Math.round(m * 0.95) + 'px;height:' + Math.round(m * 0.6) + 'px;border-radius:' + Math.round(m * 0.08) + 'px;background:#fff;',
      box('position:absolute;left:-' + Math.round(m * 0.07) + 'px;top:' + Math.round(m * 0.23) + 'px;width:' + Math.round(m * 0.14) + 'px;height:' + Math.round(m * 0.14) + 'px;border-radius:50%;background:#005ca9;') +
      box('position:absolute;right:-' + Math.round(m * 0.07) + 'px;top:' + Math.round(m * 0.23) + 'px;width:' + Math.round(m * 0.14) + 'px;height:' + Math.round(m * 0.14) + 'px;border-radius:50%;background:#005ca9;') +
      box('position:absolute;left:25%;top:28%;width:50%;height:44%;border-radius:' + Math.round(m * 0.05) + 'px;background:#f78100;' + an('blink', 1.2)));
  }

  // The one mark is small and centred: 13 % of the short side, 42 % on a banner (3:1 or more), in whole px.
  function markSize(w, h) {
    var banner = w / h >= 3 || h / w >= 3;
    return Math.max(1, Math.round(Math.min(w, h) * (banner ? 0.42 : 0.13)) || 1);
  }

  var overlay = document.getElementById('overlay');
  overlay.innerHTML = mark(markSize(window.innerWidth, window.innerHeight));
}());

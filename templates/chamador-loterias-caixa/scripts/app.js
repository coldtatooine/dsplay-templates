"use strict";

(function () {
  var u = dsplayTemplateUtils;

  // the loader stays at least this long, like the other templates' loaders
  var MIN_LOADING_DURATION = 1500;
  var startedAt = new Date().getTime();

  // the template says everything in Portuguese; the loader's word follows the screen's locale
  var texts = {
    'en_us': { loading: 'Loading' },
    'pt_br': { loading: 'Carregando' }
  };

  var input = u.media.buffer;

  var result = '';

  for (var i = 0, len = input.length; i < len; i++) {
    var c = input[i];

    if (!isNaN(c)) {
      result += c;
    }
  }

  if (result.length === 1) {
    result = '0' + result;
  }

  document.getElementById('numero').textContent = result;

  var locale = String(u.config.locale || 'pt_br').toLowerCase();
  document.getElementById('loadingText').textContent = (texts[locale] || texts.pt_br).loading;

  var remaining = Math.max(0, MIN_LOADING_DURATION - (new Date().getTime() - startedAt));
  setTimeout(function () {
    var overlay = document.getElementById('overlay');
    overlay.className = 'is-hidden';
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 500);
  }, remaining);
})();

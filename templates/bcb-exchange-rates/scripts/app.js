"use strict";

// the loader stays at least this long, like the other templates' loaders
var MIN_LOADING_DURATION = 1500;
var startedAt = new Date().getTime();

// the template shows Brazilian data in Portuguese; the loader's word follows the screen's locale
var texts = {
  'en_us': { loading: 'Loading' },
  'pt_br': { loading: 'Carregando' }
};

$(function () {
  $('#root').hide();

  var u = dsplayTemplateUtils;
  var exchanges = (u.media.result && u.media.result.exchanges) || {};

  function formatRate(value) {
    return value.toFixed(4).replace('.', ',');
  }

  function renderCurrency(code, buySelector, sellSelector) {
    var rate = exchanges[code];

    if (!rate) {
      return;
    }

    $(buySelector).text(formatRate(rate.buy.value));
    $(sellSelector).text(formatRate(rate.sell.value));
  }

  renderCurrency('EUR', '#eur-buy', '#eur-sell');
  renderCurrency('USD', '#usd-buy', '#usd-sell');

  $('#root').fadeIn();

  var locale = String(u.config.locale || 'pt_br').toLowerCase();
  $('#loadingText').text((texts[locale] || texts.pt_br).loading);

  var remaining = Math.max(0, MIN_LOADING_DURATION - (new Date().getTime() - startedAt));
  setTimeout(function () {
    $('#overlay').fadeOut(500);
  }, remaining);
});

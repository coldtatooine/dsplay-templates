'use strict';

// The loader of the template (the #overlay) is plain HTML and CSS plus a few lines of app.js, so these tests read the files.
// Run with `node --test`.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => readFileSync(path.join(root, file), 'utf-8');
const html = read('index.html');
const css = read('styles/main.css');
const js = read('scripts/app.js');

test('the overlay is a status with the word to fill and two counting digits, drawn with HTML boxes only', () => {
  assert.match(html, /<div id="overlay" role="status">/);
  assert.match(html, /id="loadingText"/);
  assert.match(html, /<div class="loader__digits" aria-hidden="true">/);
  assert.equal((html.match(/class="loader__digit"/g) || []).length, 2);
  assert.equal((html.match(/class="loader__number"/g) || []).length, 20);
  assert.doesNotMatch(html.slice(html.indexOf('id="overlay"'), html.indexOf('<script')), /<svg|<img/);
});

test('the loader says "loading" in each language app.js knows', () => {
  const sandbox = {};
  vm.createContext(sandbox);
  const start = js.indexOf('var texts = {');
  const end = js.indexOf('var input');
  new vm.Script(`${js.slice(start, end)}; this.texts = texts;`).runInContext(sandbox);
  assert.deepEqual(Object.keys(sandbox.texts).sort(), ['en_us', 'pt_br']);
  assert.equal(sandbox.texts.pt_br.loading, 'Carregando');
  for (const lang of Object.keys(sandbox.texts)) {
    assert.ok(sandbox.texts[lang].loading, `${lang} has no loading text`);
  }
});

test('the overlay stays at least 1.5 s and is hidden afterwards', () => {
  assert.match(js, /var MIN_LOADING_DURATION = 1500;/);
  assert.match(js, /}, remaining\);/);
  assert.match(js, /overlay\.style\.display = 'none'/);
});

test('the loader CSS keeps to what Android 4.4 WebViews run: prefixed keyframes, no custom properties, no flex or gap, and still when motion is not wanted', () => {
  const loaderCss = css.slice(css.indexOf('The loader:'));
  assert.doesNotMatch(loaderCss, /var\(--|^\s*--|\bgap\b|\bflex\b/m);
  for (const name of ['loader-reel', 'loader-breathe']) {
    assert.match(css, new RegExp(`@-webkit-keyframes ${name}`));
    assert.match(css, new RegExp(`@keyframes ${name}`));
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
});

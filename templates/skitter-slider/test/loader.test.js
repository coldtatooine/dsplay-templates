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

test('the overlay is a status drawing the slider: a framed strip of four slides (the first again at the end), three dots and a word to fill', () => {
  assert.match(html, /<div id="overlay" role="status">/);
  assert.match(html, /id="loadingText"/);
  assert.equal((html.match(/class="loader__slide /g) || []).length, 4);
  assert.equal((html.match(/class="loader__dot /g) || []).length, 3);
  assert.match(html, /<div class="loader__frame" aria-hidden="true">/);
  assert.match(html, /<div class="loader__dots" aria-hidden="true">/);
  assert.doesNotMatch(html.slice(html.indexOf('id="overlay"'), html.indexOf('<script')), /<svg|<img/);
});

test('the loader says "loading" in each language app.js knows', () => {
  const sandbox = {};
  vm.createContext(sandbox);
  const start = js.indexOf('var texts = {');
  const end = js.indexOf('$(document)');
  new vm.Script(`${js.slice(start, end)}; this.texts = texts;`).runInContext(sandbox);
  assert.deepEqual(Object.keys(sandbox.texts).sort(), ['en_us', 'pt_br']);
  assert.equal(sandbox.texts.pt_br.loading, 'Carregando');
  for (const lang of Object.keys(sandbox.texts)) {
    assert.ok(sandbox.texts[lang].loading, `${lang} has no loading text`);
  }
});

test('the overlay stays at least 1.5 s and until the slider\'s pictures are loaded', () => {
  assert.match(js, /var MIN_LOADING_DURATION = 1500;/);
  assert.match(js, /\$\('#overlay'\)\.fadeOut\(500\);/);
  assert.match(js, /if \(!hidden && minimumPassed && pending <= 0\)/);
  assert.match(js, /Math\.max\(0, MIN_LOADING_DURATION - \(new Date\(\)\.getTime\(\) - startedAt\)\)/);
});

test('the loader CSS keeps to what Android 4.4 WebViews run: prefixed keyframes, no custom properties, no flex gap, and still when motion is not wanted', () => {
  const loaderCss = css.slice(css.indexOf('The loader:'));
  assert.doesNotMatch(loaderCss, /var\(--|^\s*--|\bgap\b|\bflex\b/m);
  for (const name of ['loader-slide', 'loader-dot', 'loader-breathe']) {
    assert.match(css, new RegExp(`@-webkit-keyframes ${name}`));
    assert.match(css, new RegExp(`@keyframes ${name}`));
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
});

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

test('the overlay is a status with the template\'s bar, a word to fill and the counting digits', () => {
  assert.match(html, /<div id="overlay" role="status">/);
  assert.match(html, /id="loadingText"/);
  assert.match(html, /class="loader__bar"/);
  assert.equal((html.match(/class="loader__number"/g) || []).length, 10);
});

test('the loader says "loading" in each language app.js knows', () => {
  const sandbox = {};
  vm.createContext(sandbox);
  const start = js.indexOf('var texts = {');
  const end = js.indexOf('function formateDate');
  new vm.Script(`${js.slice(start, end)}; this.texts = texts;`).runInContext(sandbox);
  assert.deepEqual(Object.keys(sandbox.texts).sort(), ['en_us', 'pt_br']);
  for (const lang of Object.keys(sandbox.texts)) {
    assert.ok(sandbox.texts[lang].loading, `${lang} has no loading text`);
  }
});

test('the overlay stays at least 1.5 s', () => {
  assert.match(js, /var MIN_LOADING_DURATION = 1500;/);
  assert.match(js, /setTimeout\(function \(\) \{\s*\$\('#overlay'\)\.fadeOut\(500\);\s*\}, remaining\);/);
});

test('the loader CSS keeps to what Android 4.4 WebViews run: prefixed keyframes, no custom properties, no flex gap, and still when motion is not wanted', () => {
  assert.doesNotMatch(css, /var\(--|^\s*--|\bgap\b/m);
  for (const name of ['loader-reel', 'loader-blink', 'loader-breathe']) {
    assert.match(css, new RegExp(`@-webkit-keyframes ${name}`));
    assert.match(css, new RegExp(`@keyframes ${name}`));
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
});

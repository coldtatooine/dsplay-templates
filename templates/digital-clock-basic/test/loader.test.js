'use strict';

// The loader (the #overlay) is one small mark drawn by scripts/loader.js, plain CSS and a few lines of app.js, so these tests read the files and run the script.
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
const loader = read('scripts/loader.js');

// runs loader.js on a screen of the given size and returns what it drew into #overlay
function draw(width, height) {
  const overlay = { innerHTML: '' };
  const sandbox = { window: { innerWidth: width, innerHeight: height }, document: { getElementById: (name) => (name === 'overlay' ? overlay : null) } };
  vm.runInNewContext(loader, sandbox);
  return overlay.innerHTML;
}

test('the overlay is a labelled status with no text, filled by scripts/loader.js, which loads right after it', () => {
  assert.match(html, /<div id="overlay" role="status" aria-label="Loading"><\/div>\s*<script src="scripts\/loader\.js"><\/script>/);
  assert.doesNotMatch(html.slice(html.indexOf('id="overlay"'), html.indexOf('core-js')), /loadingText|loader__/);
  assert.doesNotMatch(js, /loadingText|loading:/);
  const drawn = draw(1920, 1080);
  assert.ok(drawn.length > 0);
  assert.equal(drawn.replace(/<[^>]*>/g, ''), '');
});

test('the mark is sized in whole px: 13 % of the short side, 42 % on a banner (3:1 or more)', () => {
  const sandbox = {};
  new vm.Script(`${loader.slice(loader.indexOf('function markSize'), loader.indexOf('  var overlay'))}; this.markSize = markSize;`).runInNewContext(sandbox);
  assert.equal(sandbox.markSize(1920, 1080), 140);
  assert.equal(sandbox.markSize(1080, 1920), 140);
  assert.equal(sandbox.markSize(1080, 1080), 140);
  assert.equal(sandbox.markSize(1920, 641), 83);
  assert.equal(sandbox.markSize(1920, 640), 269);
  assert.equal(sandbox.markSize(1920, 270), 113);
  assert.equal(sandbox.markSize(270, 1920), 113);
  [[1920, 1080], [1080, 1920], [1080, 1080], [1920, 270], [270, 1920]].forEach(([w, h]) => {
    assert.doesNotMatch(draw(w, h), /\d\.\d+px|NaN|undefined/);
  });
});

test('SVG is only a still layer (no style attribute, no animate elements) and every animation and transform has its -webkit- twin', () => {
  const drawn = draw(1920, 1080);
  assert.doesNotMatch(drawn, /<svg[^>]*style=|<animate|<set /);
  for (const property of ['animation', 'transform', 'transform-origin']) {
    const plain = drawn.match(new RegExp(`(?<![-\\w])${property}:`, 'g')) || [];
    const webkit = drawn.match(new RegExp(`-webkit-${property}:`, 'g')) || [];
    assert.equal(plain.length, webkit.length, property);
  }
  const names = [...drawn.matchAll(/(?<!-webkit-)animation:(intro-[\w-]+)/g)].map((found) => found[1]);
  assert.ok(names.length > 0);
  for (const name of new Set(names)) {
    assert.match(css, new RegExp(`@-webkit-keyframes ${name} `));
    assert.match(css, new RegExp(`@keyframes ${name} `));
  }
});

test('the overlay stays at least 1.5 s', () => {
  assert.match(js, /var MIN_LOADING_DURATION = 1500;/);
  assert.match(js, /\$\('#overlay'\)\.fadeOut\(500\);/);
  assert.match(js, /setTimeout\(function \(\) \{/);
});

test('the loader CSS keeps to what Android 4.4 WebViews run: its own background, no custom properties, no flex gap, and still when motion is not wanted', () => {
  const start = css.indexOf('/* The loader:');
  const overlayCss = css.slice(start, css.indexOf('prefers-reduced-motion', start));
  assert.match(overlayCss, /#overlay \{[^}]*background(-color)?:/);
  assert.doesNotMatch(overlayCss, /var\(--|^\s*--|\bgap\b|filter:|clamp\(/m);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

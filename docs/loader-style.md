# Loader style guide

Every template has **its own loader**: the screen a TV shows while `Loader` (`@dsplay/react-template-utils`) waits for the fonts, the images, the tasks and the minimum time. It is one **small mark** that belongs to the template (a clock face, a warning triangle, the Wi-Fi arcs, the network's logo), centred on a plain background. Nothing else.

## The rules

1. **One small mark, centred.** Its size comes from the screen, in whole px: `m = Math.round(min(w, h) * 0.13)` on landscape, portrait and square screens, and `Math.round(min(w, h) * 0.42)` on a banner (`w / h >= 3` or `h / w >= 3`). `w` and `h` come from `useScreenInfo()` (a vanilla template reads `window.innerWidth` and `window.innerHeight`). Every part of the mark is a box sized in px from that one number, so circles stay round.
2. **No text at all.** No "Loading", no words, no glyph from a font (draw `!`, `$` or `?` with boxes or a still SVG path). The loader is a `role="status"` with an `aria-label` (English, it is not shown). **One documented exception, approved by the owner:** `countdown` and `count-up` draw a single digit tile that mirrors the template's own digit tiles (a dark `#2a2a2e` box, one white bold digit counting 3, 2, 1, 0 or 0, 1, 2, 3 with `steps(4)`), set in the font stack `'Helvetica Neue',Arial,sans-serif`. A digit needs no localisation; their tests allow the digits 0 to 3 and still forbid any word.
3. **Background: black or the template's own colour.** A template whose background the customer can change (a colour, a gradient or an image) always gets black, so the loader fits any of them. The loader paints its own full background (`position: absolute`, 100 % x 100 %). It never relies on the template's background image, which may not be loaded yet. A template with a gradient background uses a plain colour first, then the gradient.
4. **One simple looping motion**, 1 to 3 s (the hands turn, a pulse, a light that moves along). `infinite`, no jump at the loop point, `ease-in-out` for pulses and `linear` for rotation.
5. **The minimum visible time is 1500 ms**: `const MIN_LOADING_DURATION = 1500;`, passed as `minDuration` to `Loader`. Real work can make it longer, never shorter. A vanilla template does the same with a timer before it hides its overlay.
6. **Style variants get their own loader.** A template with several looks (horoscope, jokes) draws one loader per style, with that style's background and mark.

## Structure

React templates:

```
src/components/intro/
  mark.js          draws the mark as an HTML string from its size m; exports markSize(w, h)
  index.jsx        Intro: useScreenInfo -> markSize -> mark, rendered into the status root
  style.sass       the root's full background, the keyframes (each with its -webkit- twin), reduced motion
  index.test.jsx   no text, sizes, whole px, still SVG, prefixes, keyframes, old-WebView guards
```

Vanilla templates: `scripts/loader.js` (the same mark, an IIFE that fills `#overlay`), the `#overlay` and keyframes in `styles/main.css`, `test/loader.test.js`.

`mark.js` and `loader.js` were generated from the approved loader design board and are plain ES5 on purpose. Edit them by hand when a mark changes; keep the helpers `an()` (animation, prefixed) and `box()` (prefixes `transform`), which every mark goes through. Animation names start with `intro-` so they never clash with the template's own keyframes.

## Android 4.4 WebView constraints

- **No CSS custom properties**, **no `gap` on flex**, no grid, no `clamp()`, no `paint-order`, no `filter: drop-shadow` (a glow is drawn with a second, wider, translucent stroke).
- **No CSS animation or transform on SVG elements** (not `transform-origin`, not `stroke-dashoffset`, not SMIL). A logo is a **still** SVG inside an HTML box (`svgI()` in `mark.js`) and the box is what moves. SVG elements carry no `style` attribute; a `transform="rotate(...)"` attribute on a static ray is fine.
- **Prefix animations and transforms**: `-webkit-animation` / `-webkit-transform` next to the standard ones, and `@-webkit-keyframes` next to `@keyframes`. Inline styles included (`an()` and `box()` do it).
- A vanilla overlay centres with the prefixed flexbox (`display: -webkit-box; display: -webkit-flex; display: flex`).
- Images the mark needs are bundled in the template (the lottery clover is a 128 px PNG in `intro/`), never a remote URL.
- Reduced motion: a `@media (prefers-reduced-motion: reduce)` block sets `animation: none !important` on the mark (the animations are inline, hence `!important`), leaving it as a still picture.

## Lessons that remain true

- **Shapes from boxes:** a triangle is a box with `width: 0; height: 0` and three borders, the side ones `transparent`; a flame is a box with `border-radius: 50% 0 50% 50%` turned `rotate(-45deg)`; a raindrop is `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%`.
- **Keyframes cannot read JavaScript sizes:** express the travel in percentages of the box itself.
- **Start the loop already in phase:** give the staggered parts negative `animation-delay`s.
- **A vanilla overlay must outrank the plugin it hides:** Skitter draws up to `z-index: 10000`, so its overlay is `100000`. Skitter only starts once every picture is in, so its overlay waits for the same pictures (load or error) as well as the minimum time.
- **No `em` under `font-size: 0`**; use `line-height: 0` for a row of inline-block dots.
- A template that kept its loader switched off shows it for 1.5 s like the others; say so in the PR.

## Checklist

1. One mark, from the design board, centred; sized by `markSize` (13 % / 42 % on banners, whole px).
2. No text; `role="status"` with `aria-label`.
3. Black or the template's own background, painted by the loader.
4. One looping motion; `MIN_LOADING_DURATION = 1500`.
5. No custom properties, no `gap`, no SVG animation, prefixed animation and transform, reduced-motion block.
6. `npm run linter`, `npm test` and `npm run zip` pass in the template.
7. A real look in a browser at a landscape, a portrait and a banner shape. Android 4.4 itself is not available in CI: say plainly when it was not tested.

## Tests

`src/components/intro/index.test.jsx` (React) and `test/loader.test.js` (vanilla) check: the status has a label and **no text**; `markSize` gives 140 px on 1920x1080, 1080x1920 and 1080x1080, and 113 px on a 1920x270 or 270x1920 banner; the mark draws whole pixels at the five usual screen shapes; SVG is still (no `style`, no `animate*`/`set`); every `animation`, `transform` and `transform-origin` in the markup has its `-webkit-` twin and every animation it names has `@keyframes` and `@-webkit-keyframes`; the stylesheet has its own background, no custom properties, no `gap`, and a reduced-motion block.

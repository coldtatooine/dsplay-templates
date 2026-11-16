# Loader style guide

Every template has **its own loader**: the screen a TV shows while `Loader` (`@dsplay/react-template-utils`) waits for the fonts, the images, the tasks and the minimum time. It is never a generic spinner and never the media type's icon: it looks like the template it announces. The reference loaders are the ones of [`templates/horoscope`](../templates/horoscope/src/components/intro/) (a wheel of the twelve glyphs round a pulsing star) and [`templates/jokes`](../templates/jokes/src/components/intro/) (a question bubble and three bouncing dots). The first group to follow them: `analog-clock`, `world-clocks-analog`, `countdown`, `count-up`, `simple-calendar` and `digital-clock-basic`.

## What makes those loaders good

- **It draws what the template is about**, with the template's own look: its colours, its background, its fonts, its shapes (the clock's grey face and three hands, the dark digit tiles on the blue gradient, the calendar's blue and navy sides). Someone who knows the template recognises it before the content shows up.
- **One small, purposeful motion.** Something that belongs to the subject moves (the hands turn, a digit counts, the days light up one after the other, a bubble wobbles). One idea, a couple of accents at most; no particles, no progress theatre.
- **Quiet and short.** It is a hand-over to the content (which fades in with `fade-in`), not a show. The word "Loading" is small and secondary.
- **It works at every screen shape.** The art is sized from `useScreenInfo()` (`w`, `h`), so a 1920x270 banner and a 540x960 portrait both show it whole.

## Structure

```
src/components/intro/
  index.jsx        the component; default export Intro, takes and spreads `props` (className)
  style.sass       its styles, with the vendor-prefixed mixins of src/styles/_mixins.sass
  index.test.jsx   what it draws, the language, the no-SVG and old-WebView guards
```

- `App` hands it to the loader: `<Loader placeholder={<Intro />} fonts={...} images={...} minDuration={MIN_LOADING_DURATION}>`, inside the `I18nextProvider` (so `useTranslation` works in the intro).
- The root is `<div {...props} className={`intro ${className || ''}`} role="status">`: `position: absolute`, 100 % x 100 %, `overflow: hidden`, a flex column that centres the art and the word. It paints **its own full background** (the template's colours, or a radial gradient of them); it never relies on the template's background image, which is a variable and may not be loaded yet.
- Sizes are computed once with `useMemo` from `useScreenInfo()` (for example `Math.round(Math.min(w, h) / 3)`), then every part is a **box sized in px from that one number** through inline `style`. Round to whole pixels (`Math.round`; even numbers for small dots) so circles stay round.
- A template with several looks (horoscope styles, jokes styles) may keep one intro for all of them, themed to the template's identity; a style may later get its own markup under `src/styles/<style>/` only when its look differs enough to justify it.
- Class names are BEM-ish and prefixed `intro__...` so they cannot collide with the template's own.

## Motion

- **Only HTML boxes move**, with CSS animations on `transform` and `opacity` (and `background-color` for a light that switches on). A `steps()` animation over a strip of digits (a "reel": a tile with `overflow: hidden` and a taller strip translated in `steps(n)`) is the way to change a text without JavaScript.
- Durations: a loop of **1.2 to 3 s** for the main motion (the sweep hand does one lap in 1.5 s, the minimum loading time), 0.9 to 1.8 s for accents (a pulse, a breath, a blink), slow ones (18 s for an hour hand, 28 s for the zodiac wheel) only for things that are meant to be barely noticed. `linear` for rotation and counting, `ease-in-out` for pulses and wobbles. No bounce overshoot, no easing that stops dead at the end of the loop; every animation is `infinite` and loops without a visible jump.
- Stagger a group with `animation-delay` (negative delays give a different phase from the first frame): set it inline with both `animationDelay` and `WebkitAnimationDelay`.
- **The minimum is 1500 ms**: `const MIN_LOADING_DURATION = 1500;` in `App`, passed as `minDuration`. Real work (fonts, images, `tasks`) can make it longer, never shorter. A vanilla template does the same with a timer before hiding its overlay.

## Text and i18n

- The loader says "Loading" in the user's language, through `t('Loading')` (the key is the English text, as everywhere; the `en` entry maps it to itself). It is a visible word, small, in the template's own font (a font the template already bundles and lists in `fonts`), usually uppercase with letter-spacing.
- Every language the template's `src/i18n.js` carries has the word, at least the six of the repo (`en`, `pt`, `es`, `it`, `de`, `nl`) plus `fr` where the template has it: `Loading`, `Carregando`, `Cargando`, `Caricamento`, `Laden`, `Laden`, `Chargement`. `App` already switches the language in an effect (`i18n.changeLanguage(lng)`) before the loader's text is drawn.
- A vanilla template without i18next keeps the same table in its own script (one entry per language it already supports) and fills the word at DOM ready.

## Android 4.4 WebView constraints (from the templates' AGENTS.md files)

The loader is the first thing the oldest devices draw, so it follows every rule of the templates:

- **No CSS custom properties** (`var(--x)`), **no `gap` on flex**, no grid, no `clamp()`, no `paint-order`. Use margins on the children.
- **No CSS animation or transform on SVG elements** (not `transform-origin`, not `stroke-dashoffset`, not SMIL). Draw the art with HTML boxes (borders, `border-radius`, backgrounds, gradients); static SVG is fine as a still layer (the zodiac glyphs), and an HTML box around it is what moves.
- **Prefix animations and transforms**: use the template's mixins (`+animation`, `+transform`, `+keyframes`, `+animation-delay` in `src/styles/_mixins.sass`); a plain-CSS template writes `-webkit-` rules next to the standard ones (`@-webkit-keyframes` too). Gradients also need a plain fallback colour before them.
- **Fonts are bundled** (woff2 + woff in the zip, `@font-face` in the template's `fonts.sass`), never a Google Fonts link, and the loader waits for the ones it uses (`fonts` prop). Use only a family the template bundles, or a system stack.
- Sass is the indented syntax (`.sass`); no unprefixed-only features newer than Chrome 45.

## Accessibility

- `role="status"` on the root: the visible word is its text, so a screen reader announces "Loading" politely (`role="img"` with `aria-label` is fine for a loader without a visible word, as in horoscope and jokes; never both). Decorative parts (the counting digits) are `aria-hidden="true"` when they would be read as noise.
- **Reduced motion**: a `@media (prefers-reduced-motion: reduce)` block turns the animations off (`animation: none`) and leaves the art in a pleasant still pose (the hands at ten past ten, the marker on the first day). Browsers that do not know the query ignore the block, which is the old behaviour.
- Contrast: the word must read on the loader's own background (a soft `text-shadow` on a light gradient).

## Lessons from the vanilla and shape-heavy loaders

- **Shapes from boxes:** a triangle (a warning sign, a mountain) is a box with `width: 0; height: 0` and three borders, the side ones `transparent`; a flame is a box with `border-radius: 50% 0 50% 50%` turned `rotate(-45deg)` (rotating an HTML box is fine, only SVG cannot be transformed); a raindrop is `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%`; a slanted band of light is a gradient box with `skewX()` in its `transform`.
- **Keyframes cannot read JavaScript sizes:** express the travel in percentages of the box itself (`translateY(260%)`, `translateX(-50%)` of a two-halves strip) so one stylesheet fits every screen; a seamless marquee is two identical halves of an `inline-block` track moved by `-50%`.
- **Start the loop already in phase:** give the staggered parts negative `animation-delay`s (in a loop's length) so the first frame already looks like the middle of the animation.
- **A vanilla overlay must outrank the plugin it hides:** Skitter draws up to `z-index: 10000`, so its overlay is `100000`; check the plugin's own layers before choosing. Skitter only starts once every picture is in, so its overlay waits for the same pictures (load or error) as well as the minimum time.
- **No `em` under `font-size: 0`:** a row of inline-block dots sized in `em` vanishes inside a parent with `font-size: 0`; use `line-height: 0` there instead.
- **The test that forbids `flex` in the loader's CSS also reads comments:** do not write the word in a comment.
- **A template that kept its loader switched off** (`image`: no minimum, no placeholder) now shows it for 1.5 s like the others; say so in the PR, it is a visible change.

## Checklist

1. It is themed to the template: colours, fonts and shapes taken from its real sass, not invented.
2. One purposeful motion, HTML boxes only, durations in the ranges above, no jump at the loop point.
3. Its own full-screen background; sizes from `useScreenInfo()`, whole pixels; fits a 1920x270 banner and a 540x960 portrait (look at both).
4. `MIN_LOADING_DURATION = 1500`, fonts listed in `fonts`.
5. `t('Loading')` in every language of the template's i18n; the word shows.
6. `role="status"` (or `role="img"` + `aria-label`), reduced-motion block.
7. No custom properties, no `gap`, no SVG animation, prefixed animation and transform.
8. `intro/index.test.jsx` passes (below), `npm run linter`, `npm test`, `npm run zip` pass in the template.
9. A real look in a browser (the dev server with the template's mock data) at the loader and at the hand-over to the content.

## Test pattern

`src/components/intro/index.test.jsx` in each template renders `<I18nextProvider i18n={i18n}><Intro /></I18nextProvider>` and checks:

- what it draws (`role="status"` with the text `Loading`, the right number of the template's own parts: hands, tiles, days, glyphs);
- the language: `await i18n.changeLanguage('pt')` gives `Carregando` (and back to `en`), and every language of the template has the key (`i18n.exists('Loading', { lng })`);
- **no SVG** in the loader (or, when static SVG is used, that no SVG node carries a `style`, `transform` or `animate*` element);
- the old-WebView guards, by reading `style.sass`: no `var(--`, no `gap`, and a `prefers-reduced-motion` block.

A vanilla template (no React) does the same with `node:test`, reading `index.html`, the stylesheet and the script (see `templates/digital-clock-basic/test/loader.test.js`).

# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this project is

The DSPLAY **Environment Monitor** media type's HTML template: a [React](https://reactjs.org/) app built with [Vite](https://vitejs.dev/) that **only displays** `media.result`, the `environment/1` document DSPLAY's player gateway answers for an `ENVIRONMENT_MONITOR` media (rain, rivers, weather warnings, current conditions and climate of a place). It calls no service: the data service is in `dsplay-web-apps` (`apps/api/src/player-gateway/providers/environment`), which owns the model (`model.ts`) and the sources. Requires Node.js 22.22.2+, 24.15.0+, or 26+ (see the repository's `.nvmrc`). See README.md for the fields it reads.

It is the cemaden template (`dsplay-template-cemaden`, Pernambuco only, three Vercel-proxied feeds fetched from the WebView) moved here: the layout is unchanged, the data calls and their parsing are gone, and the stations, thresholds and units now come from the service.

## Directory structure

```
index.html                 <-- Vite entry point
vite.config.js             <-- includes @dsplay/template-manifest's Vite plugin
public/
  dsplay-data.js            <-- mock DSPLAY data for local development, including a full example media.result
  test-assets/              <-- dev-only assets, excluded from the release build
src/
  index.jsx                 <-- React entry point
  components/
    app/                    <-- loader and fonts
    main/                   <-- the dashboard (index.jsx) and its pure helpers (model.js, tested in model.test.js)
    intro/                  <-- loading placeholder
scripts/pack.mjs           <-- zips the Vite build output into template.zip
```

## Rules of this template

- **No network code.** Everything comes from `useMedia().result`. If something is missing from the answer, change the service in `dsplay-web-apps` and its `environment/1` model, never add a fetch here.
- **A dataset the place has no source for is absent** (`result.rivers === undefined`): its section is not drawn. An empty array is "nothing to report" and shows the section's empty text.
- **Page time = media duration / number of pages** (`pageInterval` in `model.js`); do not add a page-time variable.
- **Rain intensity comes from the service** (`light` ... `extreme`, from the last hour); the template only maps it to the card colour classes in `style.sass`.
- Times in the answer are ISO 8601 UTC; the template draws them in the screen's own time zone.
- The text is Brazilian Portuguese on purpose (Brazilian sources). The styles use `vw` units and were designed for 16:9; they are unchanged from cemaden.

## File and folder naming, Sass, components

The conventions of the other React templates apply (see `templates/weather-forecast/AGENTS.md`): kebab-case files, `.sass` (indented) for our own styles, one folder with an `index.jsx` per component, imported by folder.

## Browser/WebView compatibility

Same as every template: `Chrome >= 45` / `Android >= 4.4` in `browserslist` (asserted by `src/sanity.test.js`), terser as the minifier, no `console.log`.

## Commands

```sh
npm start           # dev server
npm run linter      # eslint src
npm test            # vitest
npm run zip         # build + template.zip
```

## Supply chain hardening

Dependencies are pinned to exact versions (asserted by `src/sanity.test.js`); the repository's root `.npmrc` disables install scripts and sets `min-release-age`. See the root `AGENTS.md`.

## Commit messages

Follow the repository's convention (an emoji, then the template and what changed).

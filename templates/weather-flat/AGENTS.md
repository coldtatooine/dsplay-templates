# AGENTS.md (weather-flat)

Standalone template (outside the monorepo): copy this folder into `dsplay-templates/templates/` to transfer it, adjust the library versions if the monorepo uses others, `npm install` at the root. Install here with `npx npm@11.6.2 install` (older npm crashes without a lockfile). Do not weaken `.npmrc`.

- Spec: `.team/specs/weather-flat.md` over `weather-base.md`. Flat: no `box-shadow`, `text-shadow`, `filter`, `backdrop-filter`; `src/sanity.test.js` checks the authored sass and the final CSS (`build/`).
- Layout rectangles (rem): `src/util/layout.js`. Weather rules (codes, day/night, units, wind, outdated data): `src/util/weather.js`. Flat palette and icon recolor: `src/util/palette.js`.
- The forecast is always five days (no variable); fewer days keep the size and are centered; zero days remove the group.
- Legacy keys are read by a computed key on purpose (see `src/hooks/use-settings.js`): they stay out of `template-variables.json`.
- Dev server port 5187.

## Entrance (no loader screen)

`Loader` runs in `reveal` mode: the template mounts hidden, is shown with the class `dsplay-ready` once fonts and images are in, and `src/entrance.css` fades it in from that class. There is no intro component, placeholder or minimum time; see [`docs/entrance-style.md`](../../docs/entrance-style.md) in the repo root.


---
"@dsplay/react-template-utils": minor
---

`Loader` gets a `reveal` mode: no placeholder and no minimum time. The children are mounted hidden (`visibility: hidden`, so they still measure) while the fonts and images load, then shown with the class `dsplay-ready` on a wrapper (and `ready: true` on `LoaderContext`), so a template can start its own entrance animation. `revealTimeout` (default 4 s) caps the wait. `FontLoader` now asks the browser for each face with `document.fonts.load` and accepts `{ family, weight }` entries, so a bold face is fetched before the template is shown (`document.fonts.ready` alone resolves at once while nothing has asked for a font). A WebView without `document.fonts` waits a short fixed time.

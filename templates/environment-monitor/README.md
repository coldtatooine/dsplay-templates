![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - Environment Monitor Template

A [React](https://reactjs.org/) [HTML-based template](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform, built for the **Environment Monitor** media type (`ENVIRONMENT_MONITOR`): a dashboard of the rain gauges (last hour, with intensity), river levels against the state's flood stages, current conditions of the weather stations, the weather warnings in effect and the climate of each region, for the place the media is set to.

It fetches nothing: DSPLAY's player gateway answers the media with the `environment/1` document, the player hands it to the template as `media.result` and fetches it again when it expires, so the numbers refresh without the template doing anything.

> Built with [Vite](https://vitejs.dev/), requires Node.js 22.22.2+, 24.15.0+, or 26+ (see the repository's [`.nvmrc`](https://github.com/dsplay/dsplay-templates/blob/main/.nvmrc)). Only players that speak the gateway protocol play this media type (Android 4.2.0 and later, and the web-based players).

## Template variables

| Key              | Type | Default | Description                                      |
|------------------|------|---------|--------------------------------------------------|
| `items_per_page` | int  | `8`     | How many rain cards each page shows.             |

> Register it as a Template Var (same name and type) when configuring this template in the DSPLAY CMS.

There is no page-time variable: the rain cards are paged and every page lasts **the media's duration divided by the number of pages**, so the pages together last as long as the media (at least one second each).

## Expected media data (`media.result`)

`media.result` is the `environment/1` document. A dataset the place has no source for is **absent** (its section is not drawn); an empty list means there is nothing to report. See `public/dsplay-data.js` for a complete example.

| Field | What the template does with it |
|-------|--------------------------------|
| `sources` | The names of the sources in the header, and each `attribution.text` as the credit line in the footer |
| `rainfall[]` | Rain cards: `last1hMm` and `intensity` (`light`, `moderate`, `heavy`, `very_heavy`, `extreme`), `name`, `city`, `operator`, `observedAt`; stations with no rain in the last hour are not drawn. `summary.rainfall` feeds the section and the footer |
| `rivers[]` | River cards: `levelCm` against `thresholds` (`attention`, `alert`, `flood`), `status` |
| `alerts[]` | With the rivers above their attention level, the banner at the top: `event`, `severity`, `areas`, `areaCount` |
| `conditions[]` | Current conditions: `temperatureC`, `humidityPct`, `windKmh` |
| `climate[]` | The region bar: temperatures now and extremes, humidity, rain and ETo accumulated since `windowStart` |
| `generatedAt`, `unavailable[]` | The footer's last update, or "Atualização parcial" when a dataset failed this time |

On-screen text is Brazilian Portuguese by design: the sources are Brazilian agencies.

## Local development

This template lives in the [dsplay-templates monorepo](https://github.com/dsplay/dsplay-templates/blob/main/README.md); install from the repository root, then:

```sh
npm start
```

`public/dsplay-data.js` defines the `dsplay_config`/`dsplay_media`/`dsplay_template` mock globals used only outside the DSPLAY app; edit `dsplay_media.result` to try other answers (an absent dataset, a failed one). The DSPLAY Player App replaces the file with the real content at runtime.

## Generating the template package

```sh
npm run zip
```

Builds, then zips `build/` into `template.zip` (the template's variables are scanned into the manifest by `@dsplay/template-manifest`'s Vite plugin). Upload it to the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create) as a template of type `EnvironmentMonitor`.

## More

To see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates

To work on this template together with the others (shared libraries, creating a new template from an existing one, releases), see the [repository README](https://github.com/dsplay/dsplay-templates/blob/main/README.md).

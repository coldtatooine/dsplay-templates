import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// i18next's default export is the same instance whose methods (use/init/...) are
// individually re-exported by name, so this is a known false positive.
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          Loading: 'Loading',
          Today: 'Today',
          Min: 'Min',
          Max: 'Max',
        },
      },
      pt: {
        translations: {
          Loading: 'Carregando',
          Today: 'Hoje',
          Min: 'Min',
          Max: 'Máx',
        },
      },
      fr: {
        translations: {
          Loading: 'Chargement',
          Today: 'Aujourd\'hui',
          Min: 'Min',
          Max: 'Max',
        },
      },
      es: {
        translations: {
          Loading: 'Cargando',
          Today: 'Hoy',
          Min: 'Min',
          Max: 'Max',
        },
      },
      de: {
        translations: {
          Loading: 'Laden',
          Today: 'Heute',
          Min: 'Min',
          Max: 'Max',
        },
      },
      nl: {
        translations: {
          Loading: 'Laden',
          Today: 'Vandaag',
          Min: 'Min',
          Max: 'Max',
        },
      },
      it: {
        translations: {
          Loading: 'Caricamento',
          Today: 'Oggi',
          Min: 'Min',
          Max: 'Max',
        },
      },
    },
    fallbackLng: {
      default: ['en'],
    },
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

export default i18n;

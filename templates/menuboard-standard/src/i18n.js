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
          Untitled: 'Untitled',
          'Product {{n}}': 'Product {{n}}',
          'Price {{n}}': 'Price {{n}}',
        },
      },
      pt: {
        translations: {
          Loading: 'Carregando',
          Untitled: 'Sem título',
          'Product {{n}}': 'Produto {{n}}',
          'Price {{n}}': 'Preço {{n}}',
        },
      },
      es: {
        translations: {
          Loading: 'Cargando',
          Untitled: 'Sin título',
          'Product {{n}}': 'Producto {{n}}',
          'Price {{n}}': 'Precio {{n}}',
        },
      },
      it: {
        translations: {
          Loading: 'Caricamento',
          Untitled: 'Senza titolo',
          'Product {{n}}': 'Prodotto {{n}}',
          'Price {{n}}': 'Prezzo {{n}}',
        },
      },
      de: {
        translations: {
          Loading: 'Laden',
          Untitled: 'Unbenannt',
          'Product {{n}}': 'Produkt {{n}}',
          'Price {{n}}': 'Preis {{n}}',
        },
      },
      nl: {
        translations: {
          Loading: 'Laden',
          Untitled: 'Naamloos',
          'Product {{n}}': 'Product {{n}}',
          'Price {{n}}': 'Prijs {{n}}',
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

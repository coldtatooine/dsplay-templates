import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const productNames = {
  en: 'Product',
  pt: 'Produto',
  es: 'Producto',
  it: 'Prodotto',
  de: 'Produkt',
  nl: 'Product',
};

const priceNames = {
  en: 'Price',
  pt: 'Preço',
  es: 'Precio',
  it: 'Prezzo',
  de: 'Preis',
  nl: 'Prijs',
};

function numbered(names) {
  return Object.fromEntries(
    Object.entries(names).map(([lng, label]) => [
      lng,
      Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => {
          const n = String(i + 1).padStart(2, '0');
          return [`${names.en} ${n}`, `${label} ${n}`];
        }),
      ),
    ]),
  );
}

const productTranslations = numbered(productNames);
const priceTranslations = numbered(priceNames);

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
          ...productTranslations.en,
          ...priceTranslations.en,
        },
      },
      pt: {
        translations: {
          Loading: 'Carregando',
          Untitled: 'Sem título',
          ...productTranslations.pt,
          ...priceTranslations.pt,
        },
      },
      es: {
        translations: {
          Loading: 'Cargando',
          Untitled: 'Sin título',
          ...productTranslations.es,
          ...priceTranslations.es,
        },
      },
      it: {
        translations: {
          Loading: 'Caricamento',
          Untitled: 'Senza titolo',
          ...productTranslations.it,
          ...priceTranslations.it,
        },
      },
      de: {
        translations: {
          Loading: 'Laden',
          Untitled: 'Unbenannt',
          ...productTranslations.de,
          ...priceTranslations.de,
        },
      },
      nl: {
        translations: {
          Loading: 'Laden',
          Untitled: 'Naamloos',
          ...productTranslations.nl,
          ...priceTranslations.nl,
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

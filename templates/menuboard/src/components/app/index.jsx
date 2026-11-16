import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Loader, useConfig } from '@dsplay/react-template-utils';
import Container from '../container';
import Intro from '../intro';
import i18n from '../../i18n';
import '../../assets/styles/menu.sass';

const MIN_LOADING_DURATION = 1500;

// fonts to preload
// @font-face's must be defined in menu.sass or another in-use style file
const fonts = [
  'Hamburguer',
  'Impact',
];

function App() {
  const { locale } = useConfig();
  const [lng] = (locale || 'en').split('_');

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      <Loader
        placeholder={<Intro />}
        fonts={fonts}
        minDuration={MIN_LOADING_DURATION}
      >
        <Container />
      </Loader>
    </I18nextProvider>
  );
}

export default App;

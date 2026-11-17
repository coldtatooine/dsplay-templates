import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Loader, useConfig } from '@dsplay/react-template-utils';
import { FONTS } from '@style';
import Intro from '../intro';
import Main from '../main';
import i18n from '../../i18n';
import { lngOf } from '../../lib/model';
import './style.sass';

const MIN_LOADING_DURATION = 1500;

function App() {
  const { locale } = useConfig();
  const lng = lngOf(locale);

  // In an effect, not in the render body: changing the language updates every component that uses
  // useTranslation, and doing that while rendering loops ("Maximum update depth exceeded"). Here, not in
  // Main, so the loader is in the right language too.
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <I18nextProvider i18n={i18n}>
      <Loader
        placeholder={<Intro />}
        // the style's own fonts; their @font-face's are in the style's fonts.sass
        fonts={FONTS}
        images={[]}
        minDuration={MIN_LOADING_DURATION}
      >
        <div className="app fade-in">
          <Main />
        </div>
      </Loader>
    </I18nextProvider>
  );
}

export default App;

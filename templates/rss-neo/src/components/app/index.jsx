import { useEffect, useMemo } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Loader, useConfig } from '@dsplay/react-template-utils';
import News from '../news';
import i18n from '../../i18n';
import ViewContext from '../../hooks/view-context';
import useSettings from '../../hooks/use-settings';
import useStage from '../../hooks/use-stage';
import useLogo from '../../hooks/use-logo';
import './style.sass';
import '../../entrance.css';

// @font-face's are in fonts.sass
const fonts = ['Oswald', 'Roboto Condensed'];

function Screen() {
  const config = useConfig();
  const { i18n: i18nInstance } = useTranslation();
  const settings = useSettings();
  const stage = useStage();
  const [lng] = String((config && config.locale) || 'en').split('_');

  // In an effect, not while rendering: changing the language re-renders every component that uses useTranslation.
  useEffect(() => {
    i18nInstance.changeLanguage(lng);
  }, [i18nInstance, lng]);

  // the logo is resolved by useLogo (8 s timeout, never blocks the screen), so the Loader does not wait for it
  const logo = useLogo(settings.logoSources);
  const feedLogo = useLogo(settings.feedLogoSources);
  const view = useMemo(
    () => ({
      theme: settings.theme, stage, settings, remPx: stage.remPx, logo, feedLogo,
    }),
    [settings, stage, logo, feedLogo],
  );
  const surface = { backgroundColor: settings.theme.base };

  return (
    <ViewContext.Provider value={view}>
      <Loader
        reveal
        fonts={fonts}
      >
        <div className={`app format-${stage.format}`} style={surface}>
          <div
            className="stage"
            style={{ width: `${stage.w}rem`, height: `${stage.h}rem`, color: settings.theme.text }}
          >
            <News />
          </div>
        </div>
      </Loader>
    </ViewContext.Provider>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Screen />
    </I18nextProvider>
  );
}

export default App;

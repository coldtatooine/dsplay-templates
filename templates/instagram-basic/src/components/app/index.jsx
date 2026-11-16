import { useEffect, useLayoutEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  Loader, useConfig, useMedia, useTemplateVal, useTemplateBoolVal,
} from '@dsplay/react-template-utils';
import Posts from '../posts';
import Intro from '../intro';
import i18n from '../../i18n';
import logo from '../../images/ig-logo.png';

const MIN_LOADING_DURATION = 1500;

// fonts to preload
// @font-face's must be defined in fonts.css or another in-use style file
const fonts = [
  'Roboto',
  'Oswald',
];

function Content() {
  const horizontalBackground = useTemplateVal('bg_horizontal');
  const verticalBackground = useTemplateVal('bg_vertical');
  const showLogo = useTemplateBoolVal('show_instagram_icon', true);
  const showInfo = useTemplateBoolVal('show_info', true);
  const primaryColor = useTemplateVal('primary_color', 'white');

  const { orientation, width, height } = useConfig();
  const isVertical = orientation === 'portrait';

  const {
    result: {
      data: {
        user,
        posts,
      },
    },
    duration,
    postCount = Math.max(1, Math.floor(duration / 10000)),
  } = useMedia();

  useLayoutEffect(() => {
    if (horizontalBackground) {
      document.body.style.backgroundImage = `url("${horizontalBackground}")`;
      if (verticalBackground && isVertical) {
        document.body.style.backgroundImage = `url("${verticalBackground}")`;
      }
    } else if (verticalBackground) {
      document.body.style.backgroundImage = `url("${verticalBackground}")`;
    }
  }, [horizontalBackground, verticalBackground, isVertical]);

  useLayoutEffect(() => {
    document.querySelector('.App').classList.add('fadeIn');
    document.querySelector('.App').style.opacity = 1;
    document.body.style.color = primaryColor;
  }, [primaryColor]);

  const selectedPosts = posts.slice(0, postCount);
  const pageDuration = Math.floor((duration - 500) / Math.max(1, selectedPosts.length));

  return (
    <div className={`App ${showInfo ? '' : 'no-info'}`}>
      {
        showLogo && showInfo
        && <img className="logo" alt="logo" src={logo} />
      }
      <div className="debug">{orientation}({width}x{height})</div>
      <Posts user={user} posts={selectedPosts} pageDuration={pageDuration} />
    </div>
  );
}

function App() {
  const { locale } = useConfig();
  const [lng] = (locale || 'en').split('_');
  const horizontalBackground = useTemplateVal('bg_horizontal');
  const verticalBackground = useTemplateVal('bg_vertical');
  const { result: { data: { user: { pic } = {} } = {} } = {} } = useMedia();

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  // images to preload
  const images = [horizontalBackground, verticalBackground, pic];

  return (
    <I18nextProvider i18n={i18n}>
      <Loader
        placeholder={<Intro />}
        fonts={fonts}
        images={images}
        minDuration={MIN_LOADING_DURATION}
      >
        <Content />
      </Loader>
    </I18nextProvider>
  );
}

export default App;

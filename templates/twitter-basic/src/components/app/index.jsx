import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  Loader, useTemplateVal, useTemplateBoolVal, useConfig, useMedia,
} from '@dsplay/react-template-utils';
import './style.sass';
import UserProfile from '../user-profile';
import Posts from '../posts';
import Intro from '../intro';
import i18n from '../../i18n';

const MIN_LOADING_DURATION = 1500;

// fonts to preload
// @font-face's must be defined in fonts.css or another in-use style file
const fonts = [
  'Roboto',
  'Oswald',
];

function Content() {
  const { orientation, width, height } = useConfig();
  const isVertical = orientation === 'portrait';

  const horizontalBackground = useTemplateVal('bg_horizontal');
  const verticalBackground = useTemplateVal('bg_vertical');

  const primaryColor = useTemplateVal('primary_color', 'white');
  const userFullNameColor = useTemplateVal('user_full_name_color', primaryColor);
  const secondaryColor = useTemplateVal('secondary_color', '#B9D0FF');
  const userScreenNameColor = useTemplateVal('user_screen_name_color', secondaryColor);
  const showTwitterIcon = useTemplateBoolVal('show_twitter_icon', true);
  const twitterIconColor = useTemplateVal('twitter_icon_color', secondaryColor);

  useEffect(() => {
    if (horizontalBackground) {
      document.body.style.backgroundImage = `url("${horizontalBackground}")`;
      if (verticalBackground && isVertical) {
        document.body.style.backgroundImage = `url("${verticalBackground}")`;
      }
    } else if (verticalBackground) {
      document.body.style.backgroundImage = `url("${verticalBackground}")`;
    }
  }, [horizontalBackground, verticalBackground, isVertical]);

  useEffect(() => {
    document.querySelector('.App').classList.add('fadeIn');
    document.querySelector('.App').style.opacity = 1;

    document.body.style.color = primaryColor;
    document.querySelector('.user-name').style.color = userFullNameColor;
    document.querySelector('.user-screen-name').style.color = userScreenNameColor;

    if (!showTwitterIcon) {
      document.querySelector('#logo').style.display = 'none';
    } else {
      document.querySelector('#logo').style.color = twitterIconColor;
    }
  }, [primaryColor, userFullNameColor, userScreenNameColor, showTwitterIcon, twitterIconColor]);

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

  const selectedPosts = posts.slice(0, postCount);
  const pageDuration = Math.floor((duration - 500) / Math.max(1, selectedPosts.length));

  return (
    <div className="App">
      <div id="logo"><i className="flaticon-twitter"></i></div>
      <div className="debug">{orientation}({width}x{height})</div>
      <UserProfile {...user} />
      <Posts posts={selectedPosts} pageDuration={pageDuration} />
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

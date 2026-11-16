import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  Loader,
  useConfig,
  useTemplateBoolVal,
  useMedia,
  useScreenInfo,
} from '@dsplay/react-template-utils';
import Intro from '../intro';
import Main from '../main';
import i18n from '../../i18n';
import './style.sass';

const MIN_LOADING_DURATION = 1500;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  const finalArray = array.slice();
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = finalArray[currentIndex];
    finalArray[currentIndex] = finalArray[randomIndex];
    finalArray[randomIndex] = temporaryValue;
  }

  return finalArray;
}

function App() {
  const {
    images = [],
    result: {
      data: {
        posts = [],
      } = {},
    } = {},
  } = useMedia();
  const result = posts.map(({
    media = [],
  }) => media.map(({ urls: { lg }, cached_media_url: cached }) => cached || lg));

  let allMediaImages = [];
  result.forEach((mediaImages) => {
    allMediaImages = allMediaImages.concat(mediaImages);
  });

  const random = useTemplateBoolVal('random');
  const { screenFormat } = useScreenInfo();
  const { locale } = useConfig();
  const [lng] = (locale || 'en').split('_');

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  const imagesToShow = [...images, ...allMediaImages];

  // Pictures of an image media get the collage loader. Pictures of social posts (Instagram) come with no loader at all, like the Instagram templates, whose content just fades in.
  const fromPosts = images.length === 0 && allMediaImages.length > 0;

  // images to preload
  const imagesToLoad = [
    ...imagesToShow,
  ];

  // other tasks (Promises) to run during template intro
  let imageTasks = imagesToShow.map(async (imageSrc) => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = (e) => {
      const img = e.target;
      const { src, width, height } = img;
      resolve({ src, width, height });
    };

    image.onerror = (e) => {
      reject(e);
    };
  }));

  if (random) {
    imageTasks = shuffle(imageTasks);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Loader
        placeholder={fromPosts ? null : <Intro />}
        images={imagesToLoad}
        minDuration={MIN_LOADING_DURATION}
        tasks={imageTasks}
      >
        <div className={`app fade-in ${screenFormat}`}>
          <Main />
        </div>
      </Loader>
    </I18nextProvider>
  );
}

export default App;

import { Loader, useScreenInfo } from '@dsplay/react-template-utils';
import Intro from '../intro';
import Main from '../main';
import './style.sass';

const MIN_LOADING_DURATION = 1500;

// fonts to preload
// @font-face's must be defined in fonts.sass or another in-use style file
const fonts = [
  'Roboto Light',
  'Roboto Regular',
  'Roboto Medium',
  'Oswald',
];

function App() {
  const { screenFormat } = useScreenInfo();

  return (
    <Loader
      placeholder={<Intro />}
      fonts={fonts}
      images={[]}
      minDuration={MIN_LOADING_DURATION}
    >
      <div className={`app fade-in ${screenFormat}`}>
        <Main />
      </div>
    </Loader>
  );
}

export default App;

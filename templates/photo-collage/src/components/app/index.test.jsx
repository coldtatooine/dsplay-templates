import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { render, cleanup } from '@testing-library/react';

const state = { media: {} };

// the loader of the library shows its placeholder while it loads: the placeholder is what is checked here
vi.mock('@dsplay/react-template-utils', () => ({
  Loader: ({ placeholder }) => <div data-testid="loader">{placeholder}</div>,
  useConfig: () => ({ locale: 'en' }),
  useMedia: () => state.media,
  useTemplateBoolVal: () => false,
  useScreenInfo: () => ({ w: 1920, h: 1080, screenFormat: 'landscape' }),
  screen: { H_BANNER: 'h-banner', V_BANNER: 'v-banner' },
}));

vi.mock('../main', () => ({ default: () => null }));

import App from '.';

afterEach(cleanup);

const post = (url) => ({ media: [{ urls: { lg: url }, cached_media_url: null }] });

describe('App', () => {
  it('shows the collage loader while the pictures of an image media load', () => {
    state.media = { images: ['/a.jpg', '/b.jpg'] };
    const { container } = render(<App />);
    expect(container.querySelector('.intro__collage')).not.toBeNull();
  });

  it('shows no loader for the pictures of social posts, like the Instagram templates', () => {
    state.media = { result: { data: { posts: [post('/a.jpg'), post('/b.jpg')] } } };
    const { container } = render(<App />);
    expect(container.querySelector('.intro__collage')).toBeNull();
    expect(container.querySelector('[data-testid="loader"]').textContent).toBe('');
  });

  it('keeps the collage loader when the media has both pictures and posts', () => {
    state.media = { images: ['/a.jpg'], result: { data: { posts: [post('/b.jpg')] } } };
    const { container } = render(<App />);
    expect(container.querySelector('.intro__collage')).not.toBeNull();
  });

  it('renders with nothing at all', () => {
    state.media = {};
    expect(() => render(<App />)).not.toThrow();
  });
});

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import Intro from '.';

afterEach(cleanup);

describe('Intro', () => {
  it('draws the flame loader: a flame and two sparks, labelled for screen readers', () => {
    const { container } = render(<I18nextProvider i18n={i18n}><Intro /></I18nextProvider>);
    expect(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument();
    expect(container.querySelectorAll('.intro__spark')).toHaveLength(2);
    expect(container.querySelector('.intro__flame')).not.toBeNull();
  });
});

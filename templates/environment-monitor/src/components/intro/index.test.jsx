import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import Intro from '.';

afterEach(cleanup);

describe('Intro', () => {
  it('draws the rain loader: a cloud and three drops, labelled for screen readers', () => {
    const { container } = render(<Intro />);
    expect(screen.getByRole('img', { name: 'Carregando' })).toBeInTheDocument();
    expect(container.querySelectorAll('.intro__drop')).toHaveLength(3);
    expect(container.querySelector('.intro__cloud')).not.toBeNull();
  });
});

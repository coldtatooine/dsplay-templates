import {
  describe, it, expect, afterEach,
} from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import FireMap from '.';

afterEach(cleanup);

const points = [
  {
    lat: -8, lon: -35, count: 10, recent: 8, frpMw: 20,
  },
  {
    lat: -7.5, lon: -34.8, count: 2, recent: 0, frpMw: 3,
  },
];

describe('FireMap', () => {
  it('draws a dot per cell, orange for recent detections and amber for older ones', () => {
    const { container } = render(<FireMap data={{ scope: { type: 'world' }, points }} dot={16} />);
    const dots = [...container.querySelectorAll('svg circle')];
    expect(dots).toHaveLength(2);
    expect(dots.map((d) => d.getAttribute('fill')).sort()).toEqual(['#ff6a00', '#ffb300']);
  });

  it('draws the circle of a radius scope', () => {
    const { container } = render(<FireMap data={{ scope: { type: 'radius', lat: -8, lon: -35, radiusKm: 300 }, points }} dot={16} />);
    expect(container.querySelector('.fire-map__radius')).not.toBeNull();
  });

  it('draws the countries once their outlines have loaded, lighting the scope country', async () => {
    const { container } = render(<FireMap data={{ scope: { type: 'country', country: 'BR', lat: -8, lon: -35 }, points }} dot={16} />);
    await waitFor(() => expect(container.querySelectorAll('.fire-map__land').length).toBeGreaterThan(0));
    expect(container.querySelector('.fire-map__land--scope')).not.toBeNull();
  });

  it('draws the dots even with no points to show on a world map', () => {
    const { container } = render(<FireMap data={{ scope: { type: 'world' }, points: [] }} dot={16} />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelectorAll('svg circle')).toHaveLength(0);
  });
});

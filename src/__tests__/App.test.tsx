import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PointCanvas from '../canvas/pointCanvas';
import { Position, PointStyle, LineStyle, CanvasStyle } from '../types';

// Mock function for drawing
const mockDraw = jest.fn(
  (
    ctx: CanvasRenderingContext2D,
    pathPoints: Position[],
    lineStyle: LineStyle
  ) => {
    // Mock drawing implementation
  }
);

const mockProps = {
  draw: mockDraw,
  pathPoints: [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ] as Position[],
  points: [
    { x: 5, y: 15 },
    { x: 25, y: 35 },
  ] as Position[],
  pointStyle: { color: '#ff2626', pointSize: 10 } as PointStyle,
  lineStyle: { color: '#000000', lineWidth: 2 } as LineStyle,
  canvasStyle: { width: 800, height: 600 } as CanvasStyle,
};

describe('PointCanvas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders canvas with correct dimensions', () => {
    render(<PointCanvas {...mockProps} />);

    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('calls draw function when component mounts', () => {
    render(<PointCanvas {...mockProps} />);

    // The draw function should be called at least once
    expect(mockDraw).toHaveBeenCalled();
  });
});

// Basic smoke test for constants
describe('Constants', () => {
  it('should have interpolation options', async () => {
    const { INTERPOLATION_OPTIONS } = await import('../constant');
    expect(INTERPOLATION_OPTIONS).toBeDefined();
    expect(Array.isArray(INTERPOLATION_OPTIONS)).toBe(true);
    expect(INTERPOLATION_OPTIONS.length).toBeGreaterThan(0);
  });

  it('should have animation options', async () => {
    const { ABSOLUTE_ANIMATION_OPTIONS, RELATIVE_ANIMATION_OPTIONS } =
      await import('../constant');
    expect(ABSOLUTE_ANIMATION_OPTIONS).toBeDefined();
    expect(RELATIVE_ANIMATION_OPTIONS).toBeDefined();
    expect(Array.isArray(ABSOLUTE_ANIMATION_OPTIONS)).toBe(true);
    expect(Array.isArray(RELATIVE_ANIMATION_OPTIONS)).toBe(true);
  });
});

export interface Position {
  x: number;
  y: number;
}

export interface Point {
  position: Position;
  key: string;
}

export interface PlotPosition {
  path: Position[];
  pivotal: Position[];
}

export interface PointStyle {
  color?: string;
  pointSize?: number;
}

export interface LineStyle {
  color?: string;
  lineWidth?: number;
}

export interface CanvasStyle {
  width: number;
  height: number;
}

export interface AnimationVariable {
  name: string;
  value: number | boolean;
  type: 'number' | 'checkbox';
}

export interface AnimationOption {
  value: (variables: any) => () => Position;
  label: string;
  variable: AnimationVariable[];
}

export interface InterpolationOption {
  value: string;
  label: string;
}

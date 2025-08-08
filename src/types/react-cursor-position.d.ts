declare module 'react-cursor-position' {
  import { Component, ReactNode } from 'react';

  interface ReactCursorPositionProps {
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
    isEnabled?: boolean;
    mapChildProps?: (props: any) => any;
    onPositionChanged?: (position: { x: number; y: number }) => void;
    shouldDecorateChildren?: boolean;
    shouldStopTouchMovePropagation?: boolean;
  }

  export default class ReactCursorPosition extends Component<ReactCursorPositionProps> {}
}

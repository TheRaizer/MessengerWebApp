import { MouseEventHandler } from 'react';
import { Position } from '../../Position.type';

export type DraggableProps = {
  children: React.ReactNode;
  dragConstraints: Position;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
};

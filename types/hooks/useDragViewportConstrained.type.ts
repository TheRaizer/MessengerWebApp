import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { Coordinate } from '../Coordinate.type';

export type ConstrainedDragReturn = {
  bind: (...args: unknown[]) => ReactDOMAttributes;
  position: Coordinate;
};

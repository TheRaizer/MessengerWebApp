import { Dimensions } from './dimensions.type';
import { Position } from './Position.type';
import { AllRequired } from './Required.type';

export type MoveEvent = {
  rect: AllRequired<Dimensions<number>>;
  deltaRect: Position;
};

import { AllRequired } from './Required.type';

export type Dimensions<T extends string | number> = {
  width?: T;
  height?: T;
};

export type RequiredDimensions<T extends string | number> = AllRequired<
  Dimensions<T>
>;

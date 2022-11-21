import { ChangeEventHandler } from 'react';
import { Dimensions } from '../../dimensions.type';

export type InputProps = {
  dimensions: Dimensions;
  labelText: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

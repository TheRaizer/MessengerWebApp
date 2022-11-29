import { ChangeEventHandler } from 'react';
import { Dimensions } from '../../dimensions.type';

export type InputProps = {
  dimensions: Dimensions<string | number>;
  labelText: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

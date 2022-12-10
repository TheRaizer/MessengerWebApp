import { ChangeEventHandler } from 'react';
import { Dimensions } from '../../dimensions.type';

export type InputProps = {
  dimensions: Dimensions<string>;
  labelText: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

import { ChangeEventHandler } from 'react';
import { Dimensions } from '../../dimensions.type';

export type InputProps = {
  labelText: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  dimensions?: Dimensions<string>;
};

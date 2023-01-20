import { MouseEventHandler, ReactNode } from 'react';
import { Dimensions } from '../../dimensions.type';

export type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  dimensions?: Dimensions<string>;
  className?: string;
};

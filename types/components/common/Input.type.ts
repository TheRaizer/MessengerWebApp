import { ChangeEventHandler } from 'react';
import { Dimensions } from '../../dimensions.type';
import { DefaultTheme, StyledComponentProps } from 'styled-components';

export type InputProps = {
  labelText: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  dimensions?: Dimensions<string>;
} & StyledComponentProps<'input', DefaultTheme, Record<string, unknown>, never>;

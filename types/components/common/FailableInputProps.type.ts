import { InputProps } from './InputProps.type';

export type FailableInputProps = InputProps & {
  failedText: string;
  failed: boolean;
};

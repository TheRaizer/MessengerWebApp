import { InputProps } from './Input.type';

export type FailableInputProps = InputProps & {
  failedText: string;
  failed: boolean;
};

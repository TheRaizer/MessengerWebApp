export type LoadingProps = {
  size: number;
};

export type HourGlassProps = {
  backgroundColor: string;
  fillColor: string;
} & LoadingProps;

export type SpinnerProps = {
  color: string;
} & LoadingProps;

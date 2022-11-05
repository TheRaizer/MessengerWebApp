import { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';

const cubeMove = (spinnerSize: number) => keyframes`
  25% { 
    transform: translateX(${spinnerSize}px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(${spinnerSize}px) translateY(${spinnerSize}px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(${spinnerSize}px) translateY(${spinnerSize}px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(${spinnerSize}px) rotate(-270deg) scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const cubeCompressionRatio = 0.375; // the ratio to compress the cube with respect to the spinners overall size

const Cube = styled.div<{ spinnerSize: number }>`
  background-color: #c1c1c1;
  width: ${({ spinnerSize }) => spinnerSize * cubeCompressionRatio}px;
  height: ${({ spinnerSize }) => spinnerSize * cubeCompressionRatio}px;
  position: absolute;

  animation: ${({ spinnerSize }) => cubeMove(spinnerSize)} 1.8s infinite
    ease-in-out;
`;

const Styled = {
  Spinner: styled.div<{ spinnerSize: number }>`
    width: ${({ spinnerSize }) => spinnerSize}px;
    height: ${({ spinnerSize }) => spinnerSize}px;
  `,
  DelayedCube: styled(Cube)`
    animation-delay: -0.9s;
  `,
};

export const Spinner = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}): ReactElement => {
  return (
    <Styled.Spinner className={className} spinnerSize={size}>
      <Cube spinnerSize={size} />
      <Styled.DelayedCube spinnerSize={size} />
    </Styled.Spinner>
  );
};

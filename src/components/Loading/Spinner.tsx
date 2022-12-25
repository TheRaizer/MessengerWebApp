import styled, { keyframes } from 'styled-components';
import { SpinnerProps } from '../../../types/components/Loading.type';

const spinnerAnimation = keyframes`
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Styled = {
  Spinner: styled.div<SpinnerProps>`
    margin: auto;
    font-size: ${({ size }) => size}em;
    height: 2em;
    width: 2em;
    animation: ${spinnerAnimation} 1s linear infinite;

    & > span {
      position: absolute;
      margin: auto;
      height: 2em;
      width: 2em;
      clip: rect(16px, 2em, 2em, 0);
      animation: ${spinnerAnimation} 1.3s cubic-bezier(0.77, 0, 0.175, 1)
        infinite;

      &::before {
        content: '';
        position: absolute;
        height: 2em;
        width: 2em;
        border: 3px solid transparent;
        border-top: 3px solid ${({ color }) => color};
        border-radius: 50%;
        animation: ${spinnerAnimation} 1.3s cubic-bezier(0.77, 0, 0.175, 1)
          infinite;
      }
      &::after {
        content: '';
        position: absolute;
        height: 2em;
        width: 2em;
        border: 3px solid ${({ color }) => color};
        border-radius: 50%;
        opacity: 0.5;
      }
    }
  `,
};

export const Spinner = (spinnerProps: SpinnerProps) => {
  return (
    <Styled.Spinner {...spinnerProps}>
      <span></span>
    </Styled.Spinner>
  );
};

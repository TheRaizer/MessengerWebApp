import { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';

const dashCheck = keyframes`
  0% {
    opacity: 1;
    stroke-dashoffset: -100;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 900;
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }`;

const Styled = {
  CheckMark: styled.svg`
    width: 50px;

    & .path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
      stroke-width: 5;
      stroke-miterlimit: 10;
    }
  `,
  Circle: styled.circle`
    animation: ${dash} 0.9s ease-in-out;
  `,
  Check: styled.polyline`
    opacity: 0;
    stroke-dashoffset: -100;
    animation: ${dashCheck} 0.9s 0.35s ease-in-out forwards;
  `,
};

export const AnimatedCheckMark = (): ReactElement => {
  return (
    <Styled.CheckMark version="1.1" viewBox="0 0 130.2 130.2">
      <Styled.Circle
        className="path"
        fill="none"
        stroke="black"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <Styled.Check
        className="path"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </Styled.CheckMark>
  );
};

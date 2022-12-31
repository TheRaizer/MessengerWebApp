import { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { HourGlassProps } from '../../../types/components/Loading.type';

const hourGlassRotation = (
  backgroundColor: string,
  fillColor: string
) => keyframes`
    0%{
        transform:rotate(0deg);
        box-shadow:
            inset ${fillColor} 0 -0em 0 0,
            inset ${backgroundColor} 0 -2em 0 0,
            inset ${fillColor} 0 -4em 0 0;
    }
    80%{
        transform:rotate(0deg);
        box-shadow:
            inset ${fillColor} 0 -2em 0 0,
            inset ${backgroundColor} 0 -2em 0 0,
            inset ${fillColor} 0 -2em 0 0;
    }
    100%{
        transform:rotate(180deg);
        box-shadow:
            inset ${fillColor} 0 -2em 0 0,
            inset ${backgroundColor} 0 -2em 0 0,
            inset ${fillColor} 0 -2em 0 0;
}
`;

const Styled = {
  HourGlass: styled.svg<HourGlassProps>`
    display: block;
    background-color: ${({ backgroundColor }) => backgroundColor};
    font-size: ${({ size }) => size}em;
    margin: 3em auto;
    width: 2em;
    height: 4em;
    animation: ${({ backgroundColor, fillColor }) =>
        hourGlassRotation(backgroundColor, fillColor)}
      1s linear infinite;
  `,
  Middle: styled.path<Pick<HourGlassProps, 'backgroundColor'>>`
    fill: ${({ backgroundColor }) => backgroundColor};
  `,
  Outer: styled.path<Pick<HourGlassProps, 'fillColor'>>`
    fill: ${({ fillColor }) => fillColor};
  `,
};

export const HourGlass = (props: HourGlassProps): ReactElement => {
  return (
    <Styled.HourGlass
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 206"
      preserveAspectRatio="none"
    >
      <Styled.Middle
        backgroundColor={props.backgroundColor}
        d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"
      />
      <Styled.Outer
        fillColor={props.fillColor}
        d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"
      />
    </Styled.HourGlass>
  );
};
import { ReactElement } from 'react';
import styled from 'styled-components';
import { ButtonProps } from '../../../types/components/common/ButtonProps.type';
import { Dimensions } from '../../../types/dimensions.type';
import { DimensionStyles } from './StyledDimensions';

const Styled = {
  Button: styled.button<Dimensions>`
    ${DimensionStyles}
    border: 1px solid black;
    border-radius: 10px;
  `,
};

export const Button = ({
  children,
  onClick,
  dimensions,
  className,
}: ButtonProps): ReactElement => {
  return (
    <Styled.Button onClick={onClick} className={className} {...dimensions}>
      {children}
    </Styled.Button>
  );
};

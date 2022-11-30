import { ReactElement } from 'react';
import styled from 'styled-components';
import { InputProps } from '../../../types/components/common/Input.type';
import { Dimensions } from '../../../types/dimensions.type';
import { DimensionStyles } from './StyledDimensions';

const Styled = {
  InputContainer: styled.input<Dimensions<string>>`
    border: 1px solid black;
    background-color: var(--primary-color);
    ${DimensionStyles};
    padding: 0 0 0 10px;

    &:focus,
    &:active {
      border: 1px solid black;
    }
  `,
};

export const Input = ({
  dimensions,
  labelText,
  onChange,
  className,
}: InputProps): ReactElement => {
  return (
    <Styled.InputContainer
      {...dimensions}
      placeholder={labelText}
      onChange={onChange}
      className={className}
    />
  );
};

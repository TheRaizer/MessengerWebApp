import { ReactElement } from 'react';
import styled from 'styled-components';
import { InputProps } from '../../../types/components/common/Input.type';
import { Dimensions } from '../../../types/dimensions.type';
import { DimensionStyles } from './StyledDimensions';

const Styled = {
  InputContainer: styled.input<Dimensions<string>>`
    border: 1px solid black;
    background-color: #f8ede0;
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
  type,
  ...props
}: InputProps): ReactElement => {
  return (
    <Styled.InputContainer
      {...props}
      {...dimensions}
      placeholder={labelText}
      onChange={onChange}
      className={className}
      type={type}
    />
  );
};

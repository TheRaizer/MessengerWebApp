import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { InputProps } from '../../../types/components/common/Input.type';
import { Dimensions } from '../../../types/dimensions.type';
import { DimensionStyles } from './StyledDimensions';
import { useKeyListener } from '../../hooks/effects/useKeyListener';
import { Key } from 'ts-key-enum';
import React from 'react';

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

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dimensions, labelText, onChange, onEnter, className, type, ...props },
    ref
  ): ReactElement => {
    const [focused, setFocused] = useState(false);

    useKeyListener(() => {
      if (focused) {
        onEnter?.();
      }
    }, Key.Enter);

    return (
      <Styled.InputContainer
        {...props}
        {...dimensions}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={labelText}
        onChange={onChange}
        className={className}
        type={type}
        ref={ref}
      />
    );
  }
);

Input.displayName = 'Input';

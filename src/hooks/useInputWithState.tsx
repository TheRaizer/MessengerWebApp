import { useState } from 'react';
import { InputProps } from '../../types/components/common/InputProps.type';
import { Input } from '../components/common/Input';

export const useInputWithState = (inputProps: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const InputComponent = (
    <Input
      {...inputProps}
      onChange={(evt) => {
        setInputValue(evt.target.value);
      }}
    />
  );

  return { inputValue, InputComponent };
};

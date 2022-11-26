import { useState, useCallback } from 'react';
import { InputProps } from '../../types/components/common/InputProps.type';
import {
  AuthErrors,
  ValidityCheckerReturn,
} from '../../types/helpers/auth/Errors.type';
import { FailableInput } from '../components/common/FailableInput';

export const useSignUpInput = <T extends AuthErrors>(
  inputProps: InputProps,
) => {
  const [text, setText] = useState('');
  const [failedText, setFailedText] = useState('');
  const [failed, setFailed] = useState(false);

  const Component = (
    <FailableInput
      {...inputProps}
      failed={failed}
      failedText={failedText}
      onChange={(evt) => setText(evt.target.value)}
    />
  );

  const checkValidity = useCallback((failedText: string, validityChecker: (input: string) => ValidityCheckerReturn<T>) => {
    const { isValid } = validityChecker(text);
    setFailed(!isValid);
    if(!isValid) setFailedText(failedText)

    return isValid;
  }, [text]);

  return { Component, text, checkValidity, setFailed };
};

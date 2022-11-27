import { ReactElement } from 'react';
import styled from 'styled-components';
import { FailableInputProps } from '../../../types/components/common/FailableInputProps.type';
import { Col } from './Col';
import { Input } from './Input';

const Styled = {
  FailedText: styled.p`
    height: 1em;
    color: red;
    font-size: 12px;
  `,
  FailableInput: styled(Input)<{ failed: boolean }>`
    border: ${({ failed }) => (failed ? '1px solid red' : '1px solid black')};
  `,
};

export const FailableInput = ({
  failed,
  failedText,
  ...props
}: FailableInputProps): ReactElement => {
  const text = failed ? failedText : '';

  return (
    <Col>
      <Styled.FailableInput {...props} failed={failed} />
      <Styled.FailedText>{text}</Styled.FailedText>
    </Col>
  );
};

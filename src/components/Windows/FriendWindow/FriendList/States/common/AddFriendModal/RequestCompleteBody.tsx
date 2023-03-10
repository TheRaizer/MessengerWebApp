import { ReactElement } from 'react';
import styled from 'styled-components';
import { AnimatedCheckMark } from '../../../../../../common/AnimatedCheckMark';

const Styled = {
  Title: styled.h3`
    text-align: center;
    font-size: 1.5em;
    font-weight: normal;
  `,
  CheckMark: styled(AnimatedCheckMark)`
    width: 100px;
    height: 100px;
  `,
};

export const RequestCompleteBody = (): ReactElement => {
  return (
    <>
      <Styled.Title>Sent Successfully!</Styled.Title>
      <Styled.CheckMark />
    </>
  );
};

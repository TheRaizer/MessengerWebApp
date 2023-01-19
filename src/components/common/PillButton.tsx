import styled from 'styled-components';
import { Button } from './Button';
import { ReactElement } from 'react';
import { ButtonProps } from '../../../types/components/common/Button.type';

const Styled = {
  Pill: styled(Button)`
    border-radius: 30%;
  `,
};

export const PillButton = (props: ButtonProps): ReactElement => {
  return <Styled.Pill {...props}>{props.children}</Styled.Pill>;
};

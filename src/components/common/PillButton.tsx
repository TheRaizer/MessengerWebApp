import styled from 'styled-components';
import { Button } from './Button';
import { ReactElement } from 'react';
import { ButtonProps } from '../../../types/components/common/Button.type';

const Styled = {
  Pill: styled(Button)`
    border-radius: 20px;
    background-color: var(--primary-color);

    &:hover {
      filter: brightness(0.8);
    }
  `,
};

export const PillButton = ({
  children,
  ...props
}: ButtonProps): ReactElement => {
  return <Styled.Pill {...props}>{children}</Styled.Pill>;
};

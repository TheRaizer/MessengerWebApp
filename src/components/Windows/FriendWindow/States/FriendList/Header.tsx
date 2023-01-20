import { ReactElement } from 'react';
import styled from 'styled-components';
import { PillButton } from '../../../../common/PillButton';

const Styled = {
  HeaderContainer: styled.div`
    display: flex;
    width: 100%;
    padding: 4px 10px;
    gap: 10px;
  `,
  SelectablePillButton: styled(PillButton)<{ selected: boolean }>`
    font-size: 0.8em;
    padding: 1px 5px;

    background-color: var(--primary-color);

    filter: ${({ selected }) => selected && 'brightness(0.7)'};
  `,
};

export const Header = (): ReactElement => {
  return (
    <Styled.HeaderContainer>
      <Styled.SelectablePillButton selected>
        Friends
      </Styled.SelectablePillButton>
      <Styled.SelectablePillButton selected>Sent</Styled.SelectablePillButton>
      <Styled.SelectablePillButton selected>
        Recieved
      </Styled.SelectablePillButton>
    </Styled.HeaderContainer>
  );
};

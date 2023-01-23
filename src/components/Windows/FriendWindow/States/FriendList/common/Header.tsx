import { ReactElement } from 'react';
import styled from 'styled-components';
import { FriendListSearchBar } from './FriendListSearchBar';
import { FriendListStates } from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import { HeaderProps } from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/Header.type';
import { PillButton } from '../../../../../common/PillButton';

const Styled = {
  HeaderContainer: styled.div`
    display: flex;
    width: 100%;
    padding: 4px 10px;
    gap: 10px;
    font-size: 0.8em;
  `,
  SelectablePillButton: styled(PillButton)<{ selected: boolean }>`
    padding: 1px 5px;

    filter: ${({ selected }) => selected && 'brightness(0.7)'};
  `,
};

export const Header = ({
  changeState,
  currentState,
}: HeaderProps): ReactElement => {
  return (
    <Styled.HeaderContainer>
      <Styled.SelectablePillButton
        onClick={() => changeState(FriendListStates.FRIENDS, { changeState })}
        selected={currentState === FriendListStates.FRIENDS}
      >
        Friends
      </Styled.SelectablePillButton>
      <Styled.SelectablePillButton
        onClick={() => changeState(FriendListStates.SENT, { changeState })}
        selected={currentState === FriendListStates.SENT}
      >
        Sent
      </Styled.SelectablePillButton>
      <Styled.SelectablePillButton
        onClick={() => changeState(FriendListStates.RECIEVED, { changeState })}
        selected={currentState === FriendListStates.RECIEVED}
      >
        Recieved
      </Styled.SelectablePillButton>
      <FriendListSearchBar />
    </Styled.HeaderContainer>
  );
};

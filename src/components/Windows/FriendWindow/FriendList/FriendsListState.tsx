import { ReactElement } from 'react';
import styled from 'styled-components';
import {
  FriendWindowStates,
  FriendsStateProps,
} from '../../../../../types/components/Windows/FriendWindow.type';
import { ChangeStateProp } from '../../../../../types/hooks/useStateMachine.type';
import { Col } from '../../../common/Col';

const Styled = {
  FriendsListContainer: styled(Col)`
    width: 100%;
    gap: 5px;
    overflow-y: scroll;
    /* width */
    &::-webkit-scrollbar {
      width: 23px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--primary-color-2);
      border-left: 1px solid black;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-left: 1px solid black;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      background: var(--primary-color);
    }
  `,
};

export const FriendsListState = ({
  changeState,
}: ChangeStateProp<FriendWindowStates, FriendsStateProps>): ReactElement => {
  return <Styled.FriendsListContainer as="ul"></Styled.FriendsListContainer>;
};

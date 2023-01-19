import { ReactElement } from 'react';
import styled from 'styled-components';
import {
  FriendWindowStates,
  FriendsStateProps,
} from '../../../../../../types/components/Windows/FriendWindow/FriendWindow.type';
import {
  ChangeStateProp,
  StatesDictionary,
} from '../../../../../../types/hooks/useStateMachine.type';
import { Col } from '../../../../common/Col';
import { Friends } from './States/Friends';
import { Recieved } from './States/Recieved';
import { Sent } from './States/Sent';
import { useStateMachine } from '../../../../../hooks/statemachine/useStateMachine';
import {
  FriendListStates,
  FriendListStateProps,
} from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';

const Styled = {
  FriendsListContainer: styled(Col)`
    height: 100%;
    width: 100%;
    gap: 5px;
    overflow-y: auto;

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

const friendWindowStates: StatesDictionary<
  FriendListStates,
  FriendListStateProps
> = {
  [FriendListStates.FRIENDS]: (props) => <Friends {...props} />,
  [FriendListStates.RECIEVED]: (props) => <Recieved {...props} />,
  [FriendListStates.SENT]: (props) => <Sent {...props} />,
};

export const FriendsListState = ({}: ChangeStateProp<
  FriendWindowStates,
  FriendsStateProps
>): ReactElement => {
  const { CurrentComponent } = useStateMachine(
    friendWindowStates,
    FriendListStates.FRIENDS,
    {}
  );

  return (
    <Styled.FriendsListContainer as="ul">
      {CurrentComponent}
    </Styled.FriendsListContainer>
  );
};

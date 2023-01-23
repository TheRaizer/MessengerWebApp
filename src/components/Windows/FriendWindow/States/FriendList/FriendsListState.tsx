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
import { useStateMachine } from '../../../../../hooks/statemachine/useStateMachine';
import {
  FriendListStates,
  FriendListStateProps,
} from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import dynamic from 'next/dynamic';
import { Header } from './common/Header';

const Styled = {
  FriendsListContainer: styled(Col)`
    height: 100%;
    width: 100%;
    gap: 5px;
    overflow-y: auto;
    border-top: 1px solid black;

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

const Friends = dynamic<
  ChangeStateProp<FriendListStates, FriendListStateProps>
>(() => import('./States/Friends').then((mod) => mod.Friends));

const Recieved = dynamic<
  ChangeStateProp<FriendListStates, FriendListStateProps>
>(() => import('./States/Recieved').then((mod) => mod.Recieved));

const Sent = dynamic<ChangeStateProp<FriendListStates, FriendListStateProps>>(
  () => import('./States/Sent').then((mod) => mod.Sent)
);

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
  const { CurrentComponent, changeState, currentState } = useStateMachine(
    friendWindowStates,
    FriendListStates.FRIENDS,
    {}
  );

  return (
    <>
      <Header
        changeState={
          changeState as (
            newState: FriendListStates,
            props: ChangeStateProp<FriendListStates, FriendListStateProps>
          ) => void
        }
        currentState={currentState}
      />
      <Styled.FriendsListContainer as="ul">
        {CurrentComponent}
      </Styled.FriendsListContainer>
    </>
  );
};

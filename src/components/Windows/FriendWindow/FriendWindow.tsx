import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import {
  FriendsStateProps,
  FriendWindowProps,
  FriendWindowStates,
} from '../../../../types/components/Windows/FriendWindow.type';
import {
  ChangeStateProp,
  StatesDictionary,
} from '../../../../types/hooks/useStateMachine.type';
import { WithRequired } from '../../../../types/Required.type';
import { useStateMachine } from '../../../hooks/statemachine/useStateMachine';
import { WindowContainer } from '../WindowContainer';

const FriendListState = dynamic<
  ChangeStateProp<FriendWindowStates, FriendsStateProps>
>(() => import('./FriendListState').then((mod) => mod.FriendListState));
const FriendState = dynamic<
  FriendsStateProps[FriendWindowStates.FRIEND] &
    ChangeStateProp<FriendWindowStates, FriendsStateProps>
>(() => import('./FriendState').then((mod) => mod.FriendState));

const friendWindowStates: StatesDictionary<
  FriendWindowStates,
  FriendsStateProps
> = {
  [FriendWindowStates.FRIENDS_LIST]: (props) => <FriendListState {...props} />,
  [FriendWindowStates.FRIEND]: (props) => <FriendState {...props} />,
};

export const FriendWindow = ({
  friendUsername,
}: WithRequired<FriendWindowProps, 'id'>): ReactElement => {
  const { state, props } = friendUsername
    ? { state: FriendWindowStates.FRIEND, props: { friendUsername } }
    : {
        state: FriendWindowStates.FRIENDS_LIST,
        props: {},
      };
  // if a username is given when a friend window is created, then we make the state the friend state
  const { CurrentComponent } = useStateMachine(
    friendWindowStates,
    state,
    props
  );
  return (
    <WindowContainer title={friendUsername}>{CurrentComponent}</WindowContainer>
  );
};

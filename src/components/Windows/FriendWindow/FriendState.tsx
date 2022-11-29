import { ReactElement } from 'react';
import {
  FriendsStateProps,
  FriendWindowStates,
} from '../../../../types/components/Windows/FriendWindow.type';
import { ChangeStateProp } from '../../../../types/hooks/useStateMachine.type';

export const FriendState = (
  props: FriendsStateProps[FriendWindowStates.FRIEND] &
    ChangeStateProp<FriendWindowStates, FriendsStateProps>
): ReactElement => {
  return <p>{props.friendUsername}</p>;
};

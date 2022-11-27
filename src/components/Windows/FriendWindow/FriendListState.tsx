import { ReactElement } from 'react';
import {
  FriendWindowStates,
  FriendsStateProps,
} from '../../../../types/components/Windows/FriendWindowProps.type';
import { ChangeStateProp } from '../../../../types/hooks/useStateMachine.type';

export const FriendListState = ({
  changeState,
}: ChangeStateProp<FriendWindowStates, FriendsStateProps>): ReactElement => {
  return <div></div>;
};

import { ReactElement } from 'react';
import {
  FriendsStateProps,
  FriendWindowStates,
} from '../../../../types/components/Windows/FriendWindowProps.type';

export const FriendState = (props: FriendsStateProps): ReactElement => {
  return <p>{props[FriendWindowStates.FRIEND]?.friendUsername}</p>;
};

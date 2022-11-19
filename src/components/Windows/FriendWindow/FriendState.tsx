import { ReactElement, useMemo } from 'react';
import {
  FriendsStateProps,
  FriendWindowStates,
} from '../../../../types/components/Windows/FriendWindowProps.type';

export const FriendState = (props: FriendsStateProps): ReactElement => {
  const friendProps = useMemo(() => props[FriendWindowStates.FRIEND], [props]);
  return <p>{friendProps?.friendUsername}</p>;
};

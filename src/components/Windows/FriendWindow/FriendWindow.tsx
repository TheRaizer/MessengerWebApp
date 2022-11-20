import dynamic from 'next/dynamic';
import { ReactElement, useMemo } from 'react';
import {
  FriendsStateProps,
  FriendWindowProps,
  FriendWindowStates,
} from '../../../../types/components/Windows/FriendWindowProps.type';
import { State } from '../../../../types/hooks/useStateMachine.type';
import { WithRequired } from '../../../../types/WithRequired.type';
import { useStateMachine } from '../../../hooks/useStateMachine';

const FriendListState = dynamic<FriendsStateProps>(() =>
  import('./FriendListState').then((mod) => mod.FriendListState)
);
const FriendState = dynamic<FriendsStateProps>(() =>
  import('./FriendState').then((mod) => mod.FriendState)
);

const friendWindowStates: Record<
  FriendWindowStates,
  State<FriendWindowStates, FriendsStateProps>
> = {
  [FriendWindowStates.FRIENDS_LIST]: (props) => <FriendListState {...props} />,
  [FriendWindowStates.FRIEND]: (props) => <FriendState {...props} />,
};

export const FriendWindow = ({
  friendUsername,
}: WithRequired<FriendWindowProps, 'id'>): ReactElement => {
  // if a username is given when a friend window is created, then we make the state the friend state
  const {
    initialState,
    stateProps,
  }: {
    initialState: FriendWindowStates;
    stateProps: Omit<FriendsStateProps, 'changeState'>;
  } = useMemo(() => {
    if (friendUsername) {
      return {
        initialState: FriendWindowStates.FRIEND,
        stateProps: {
          [FriendWindowStates.FRIEND]: {
            friendUsername: friendUsername,
          },
        },
      };
    }

    return {
      initialState: FriendWindowStates.FRIENDS_LIST,
      stateProps: { [FriendWindowStates.FRIENDS_LIST]: {} },
    };
  }, [friendUsername]);

  const { CurrentComponent } = useStateMachine(
    friendWindowStates,
    initialState,
    stateProps
  );
  return <div>{CurrentComponent}</div>;
};

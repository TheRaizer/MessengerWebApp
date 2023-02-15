import { ReactElement, useContext } from 'react';
import {
  ActiveStatus,
  FriendItemProps,
} from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { nextCursorSWRGetKey } from '../../../../../../../../helpers/pagination';
import { FRIEND_LIMIT } from '../../../../../../../../constants/pagination';
import { selectUser } from '../../../../../../../../redux/slices/userSlice';
import { useAppSelector } from '../../../../../../../../redux/hooks';
import { socketContext } from '../../../../../../../Providers/SocketProvider';

export const RecievedItem = ({
  mutate,
  friendId,
  ...props
}: FriendItemProps): ReactElement => {
  const { mutate: mutateFriends } = useSWRConfig();
  const { user } = useAppSelector(selectUser);
  const socket = useContext(socketContext);

  return (
    <AddressRequestItem
      {...props}
      friendId={friendId}
      mutate={mutate}
      getRoute={(friendUsername) =>
        `friends/requests/accept?requester_username=${friendUsername}`
      }
      buttonText={'Accept'}
      onClick={() => {
        mutateFriends(
          unstable_serialize(nextCursorSWRGetKey('friends', FRIEND_LIMIT))
        ).catch((err) => console.error(err));

        if (!user) return;

        // ping pong status between this user and the newly added friend
        socket?.emit('ping status change', {
          user_id: user.user_id,
          status: ActiveStatus.ACTIVE,
          friend_id: friendId,
        });
      }}
    />
  );
};

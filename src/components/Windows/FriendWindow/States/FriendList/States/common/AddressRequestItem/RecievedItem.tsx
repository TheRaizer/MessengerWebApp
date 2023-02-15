import { ReactElement } from 'react';
import { FriendItemProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { nextCursorSWRGetKey } from '../../../../../../../../helpers/pagination';
import { FRIEND_LIMIT } from '../../../../../../../../constants/pagination';
import { selectUser } from '../../../../../../../../redux/slices/userSlice';
import { useAppSelector } from '../../../../../../../../redux/hooks';

export const RecievedItem = ({
  mutate,
  friendId,
  ...props
}: FriendItemProps): ReactElement => {
  const { mutate: mutateFriends } = useSWRConfig();
  const { user } = useAppSelector(selectUser);

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
        console.log('Emit too', friendId);
        // TODO: emit something that will ping pong statuses between two users.
        // the event on the server should call the "status change" event name to do so.
      }}
    />
  );
};

import { ReactElement } from 'react';
import { FriendItemProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { nextCursorSWRGetKey } from '../../../../../../../../helpers/pagination';

export const RecievedItem = ({
  mutate,
  ...props
}: FriendItemProps): ReactElement => {
  const { mutate: mutateFriends } = useSWRConfig();
  return (
    <AddressRequestItem
      {...props}
      mutate={mutate}
      getRoute={(friendUsername) =>
        `friends/requests/accept?requester_username=${friendUsername}`
      }
      buttonText={'Accept'}
      onClick={() => {
        mutateFriends(
          unstable_serialize(nextCursorSWRGetKey('/friends', 1))
        ).catch((err) => console.error(err));
        // TODO: listen for that users status in socketio
      }}
    />
  );
};

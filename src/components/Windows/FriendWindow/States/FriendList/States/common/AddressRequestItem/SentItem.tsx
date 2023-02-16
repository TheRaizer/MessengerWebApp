import { ReactElement } from 'react';
import { FriendItemProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';

export const SentItem = (props: FriendItemProps): ReactElement => {
  return (
    <AddressRequestItem
      {...props}
      getRoute={(friendUsername) =>
        `friends/requests?friend_username=${friendUsername}`
      }
      routeMethod={'DELETE'}
      buttonText={'Cancel'}
    />
  );
};

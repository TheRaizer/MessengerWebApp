import { ReactElement } from 'react';
import { AddressRequestItem } from './AddressRequestItem';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/FriendList/common/FriendItem/FriendItem.type';

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

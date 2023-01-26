import { ReactElement } from 'react';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';

export const SentItem = (props: FriendItemProps): ReactElement => {
  return (
    <AddressRequestItem
      {...props}
      getRoute={(friendUsername) =>
        `friends/requests/cancel?request_addressee_username=${friendUsername}`
      }
      buttonText={'Cancel'}
    />
  );
};

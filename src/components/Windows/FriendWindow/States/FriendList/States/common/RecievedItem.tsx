import { ReactElement } from 'react';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { AddressRequestItem } from './AddressRequestItem';

export const RecievedItem = (props: FriendItemProps): ReactElement => {
  return (
    <AddressRequestItem
      {...props}
      getRoute={(friendUsername) =>
        `friends/requests/accept?requester_username=${friendUsername}`
      }
      buttonText={'Accept'}
    />
  );
};

import { ReactElement } from 'react';
import { FriendInfo } from './FriendInfo';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { ItemButton } from './ItemPillButton';

export const RecievedItem = ({
  friendUsername,
}: FriendItemProps): ReactElement => {
  return (
    <FriendInfo friendUsername={friendUsername}>
      <ItemButton>Accept</ItemButton>
    </FriendInfo>
  );
};

import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { FriendInfo } from './FriendInfo';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';

const EnvelopeIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiEnvelope)
);

export const FriendItem = ({
  friendUsername,
  friendId,
}: FriendItemProps): ReactElement => {
  return (
    <FriendInfo friendUsername={friendUsername} friendId={friendId}>
      <EnvelopeIcon size={40} />
    </FriendInfo>
  );
};

import { FriendItemProps } from '../../../FriendWindow/FriendList/common/FriendItem/FriendItem.type';

export type MessageInputProps = Omit<FriendItemProps, 'mutate'>;

import { FriendItemProps } from '../../../FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';

export type MessageInputProps = Omit<FriendItemProps, 'mutate' | 'friendId'>;

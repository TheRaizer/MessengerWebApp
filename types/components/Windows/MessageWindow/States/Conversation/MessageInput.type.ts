import { MessageModel } from '../../../../../Models/MessageModel.type';
import { FriendItemProps } from '../../../FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';

export type MessageInputProps = Omit<FriendItemProps, 'mutate'> & {
  onMessageEmit: (message: MessageModel) => void;
};

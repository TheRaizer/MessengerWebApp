import { ChangeStateProp } from '../../../hooks/useStateMachine.type';
import { GeneralWindowProps } from '../../../redux/states/windows.type';
import { FriendItemProps } from '../FriendWindow/FriendList/common/FriendItem/FriendItem.type';

export type MessageWindowProps = {
  friendId?: number;
  friendUsername?: string;
  groupChatId?: number;
} & GeneralWindowProps;

export enum MessageWindowStates {
  CONVERSATION = 'conversation',
  CONVERSATIONS_LIST = 'conversations_list',
}

export interface MessageWindowStateProps
  extends ChangeStateProp<MessageWindowStates, MessageWindowStateProps> {
  [MessageWindowStates.CONVERSATION]: Omit<FriendItemProps, 'mutate'>;
  [MessageWindowStates.CONVERSATIONS_LIST]: Record<string, never>;
}

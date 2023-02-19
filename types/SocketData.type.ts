import { ActiveStatus } from './components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';

export type StatusChangeEventData = {
  user_id: number;
  status: ActiveStatus;
};

export type FriendStatusChangeEventData = {
  friend_id: number;
} & StatusChangeEventData;

export type SendMessageData = {
  addressee_username: string;
  content: string;
  group_chat_id: number | null;
  access_token: string;
};

export type ErrorData = {
  detail: string;
  status_code: string;
};

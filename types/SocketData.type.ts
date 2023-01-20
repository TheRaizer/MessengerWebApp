import { ActiveStatus } from './components/Windows/FriendWindow/States/FriendList/FriendItem.type';

export type StatusChangeEventData = {
  user_id: number;
  status: ActiveStatus;
};

export type FriendStatusChangeEventData = {
  friend_id: number;
} & StatusChangeEventData;

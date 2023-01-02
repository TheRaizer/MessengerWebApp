import { ActiveStatus } from './components/Windows/FriendList/FriendItem.type';

export type StatusChangeData = {
  user_id: number;
  status: ActiveStatus;
};

export type FriendStatusChangeData = {
  friend_id: number;
} & StatusChangeData;

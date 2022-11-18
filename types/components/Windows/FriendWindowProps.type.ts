import { WindowId } from '../../redux/states/windows.type';

export type FriendWindowProps = {
  friendUsername: string;
} & WindowId;

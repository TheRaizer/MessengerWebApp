import { ChangeStateProp } from '../../hooks/useStateMachine.type';
import { WindowId } from '../../redux/states/windows.type';

export type FriendWindowProps = {
  friendUsername: string;
} & WindowId;

export enum FriendWindowStates {
  FRIENDS_LIST = 'friends_list',
  FRIEND = 'friend',
}

export interface FriendsStateProps
  extends ChangeStateProp<FriendWindowStates, FriendsStateProps> {
  // TODO: implement better way to show empty props instead of unknown, without typescript errors
  [FriendWindowStates.FRIENDS_LIST]: unknown;
  [FriendWindowStates.FRIEND]: {
    friendUsername: string;
  };
}

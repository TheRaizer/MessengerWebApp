import { ChangeStateProp } from '../../hooks/useStateMachine.type';
import { GeneralWindowProps } from '../../redux/states/windows.type';

export type FriendWindowProps = {
  friendUsername: string;
} & GeneralWindowProps;

export enum FriendWindowStates {
  FRIENDS_LIST = 'friends_list',
  FRIEND = 'friend',
}

export interface FriendsStateProps
  extends ChangeStateProp<FriendWindowStates, FriendsStateProps> {
  [FriendWindowStates.FRIENDS_LIST]: Record<string, never>;
  [FriendWindowStates.FRIEND]: {
    friendUsername: string;
  };
}

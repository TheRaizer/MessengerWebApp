import { ChangeStateProp } from '../../../../../hooks/useStateMachine.type';

export enum FriendListStates {
  FRIENDS = 'friends',
  SENT = 'sent',
  RECIEVED = 'recieved',
}

export interface FriendListStateProps
  extends ChangeStateProp<FriendListStates, FriendListStateProps> {
  [FriendListStates.FRIENDS]: Record<string, never>;
  [FriendListStates.SENT]: Record<string, never>;
  [FriendListStates.RECIEVED]: Record<string, never>;
}

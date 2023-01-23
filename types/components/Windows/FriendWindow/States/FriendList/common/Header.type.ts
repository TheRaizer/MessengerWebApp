import { ChangeStateProp } from '../../../../../../hooks/useStateMachine.type';
import { FriendListStates, FriendListStateProps } from '../FriendList.type';

export type HeaderProps = {
  changeState: (
    newState: FriendListStates,
    props: ChangeStateProp<FriendListStates, FriendListStateProps>
  ) => void;
  currentState: FriendListStates;
};

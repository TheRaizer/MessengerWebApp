import {
  FriendStatusChangeEventData,
  StatusChangeEventData,
} from './SocketData.type';

export interface ServerToClientEvents {
  ['ping status change']: (data: StatusChangeEventData) => void;
  ['friend status changed']: (data: StatusChangeEventData) => void;
}

export interface ClientToServerEvents {
  ['pong status change']: (data: FriendStatusChangeEventData) => void;
}

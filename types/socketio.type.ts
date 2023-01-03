import {
  FriendStatusChangeEventData,
  StatusChangeEventData,
} from './SocketData.type';

export interface ServerToClientEvents {
  ['status change']: (data: StatusChangeEventData) => void;
  ['friend status change']: (data: StatusChangeEventData) => void;
}

export interface ClientToServerEvents {
  ['broadcast_current_status_to_friend']: (
    data: FriendStatusChangeEventData
  ) => void;
}

import { StatusChangeData } from './SocketData.type';

export interface ServerToClientEvents {
  ['status change']: (data: StatusChangeData) => void;
  ['friend status change']: (data: StatusChangeData) => void;
}

export interface ClientToServerEvents {
  ['broadcast_current_status_to_friend']: (data: StatusChangeData) => void;
}

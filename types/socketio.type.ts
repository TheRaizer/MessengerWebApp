import {
  FriendStatusChangeEventData,
  StatusChangeEventData,
  SendMessageData,
  ErrorData,
} from './SocketData.type';

export interface ServerToClientEvents {
  ['ping status change']: (data: StatusChangeEventData) => void;
  ['friend status changed']: (data: StatusChangeEventData) => void;
  ['message response']: (
    data: { message?: string } & Partial<ErrorData> & {
        message_tracking_id?: string;
      }
  ) => void;
}

export interface ClientToServerEvents {
  ['pong status change']: (data: FriendStatusChangeEventData) => void;
  ['ping status change']: (data: FriendStatusChangeEventData) => void;
  ['message']: (data: SendMessageData) => void;
}

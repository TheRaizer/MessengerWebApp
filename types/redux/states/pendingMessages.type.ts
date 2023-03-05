import { MessageModel } from '../../Models/MessageModel.type';

export type PendingMessageState = {
  [recieverId: number]: {
    [message_tracking_id: string]: {
      message: MessageModel;
      recieverUsername?: string;
    };
  };
};

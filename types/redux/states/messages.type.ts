import { MessageModel } from '../../Models/MessageModel.type';

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
}

export type MessageState = {
  [recieverId: number]: {
    message: MessageModel;
    messageStatus: MessageStatus;
  }[];
};

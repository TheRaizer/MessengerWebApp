import { MessageModel } from '../../../../../Models/MessageModel.type';

export type MessageProps = MessageModel & { friendUsername: string };

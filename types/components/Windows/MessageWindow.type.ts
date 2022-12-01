import { WindowIdProp } from '../../redux/states/windows.type';

export type MessageWindowProps = {
  usernameToMessage?: string;
  groupChatId?: number;
} & WindowIdProp;

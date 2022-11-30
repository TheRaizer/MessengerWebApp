import { WindowIdMap } from '../../redux/states/windows.type';

export type MessageWindowProps = {
  usernameToMessage?: string;
  groupChatId?: number;
} & WindowIdMap;

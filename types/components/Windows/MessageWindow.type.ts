import { GeneralWindowProps } from '../../redux/states/windows.type';

export type MessageWindowProps = {
  usernameToMessage?: string;
  groupChatId?: number;
} & GeneralWindowProps;

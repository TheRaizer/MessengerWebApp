import { FriendWindowProps } from '../../components/Windows/FriendWindow.type';
import { MessageWindowProps } from '../../components/Windows/MessageWindow.type';

export enum WindowType {
  FRIEND = 'friend',
  MESSAGE = 'message',
}

export type WindowIdentifier = string | number;

/**
 * This type must be used by all window components.
 * It allows us to handle deletion correctly. And is used during the map function.
 */
export type WindowIdMap = {
  id?: WindowIdentifier;
};

export type WindowProps = {
  [WindowType.MESSAGE]: MessageWindowProps;
  [WindowType.FRIEND]: FriendWindowProps;
};

export type WindowStateValue = {
  windowType: WindowType;
  windowProps: WindowProps[WindowType];
} & Required<WindowIdMap>;

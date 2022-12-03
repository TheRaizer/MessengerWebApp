import { FriendWindowProps } from '../../components/Windows/FriendWindow.type';
import { MessageWindowProps } from '../../components/Windows/MessageWindow.type';

export enum WindowType {
  FRIEND = 'friend',
  MESSAGE = 'message',
}

export type WindowIdentifier = string | number;

export type WindowProps = {
  [WindowType.MESSAGE]: MessageWindowProps;
  [WindowType.FRIEND]: FriendWindowProps;
};

export type GeneralWindowProps = {
  id?: WindowIdentifier;
};

export type WindowStateValues = {
  windowType: WindowType;
  windowProps: WindowProps[WindowType] & GeneralWindowProps;
};

export type WindowState = {
  [key: WindowIdentifier]: WindowStateValues;
};

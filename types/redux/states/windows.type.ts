import { MessageWindowProps } from '../../components/Windows/MessageWindow/MessageWindow.type';

export enum WindowType {
  FRIEND = 'friend',
  MESSAGE = 'message',
}

export type WindowIdentifier = string | number;

export type WindowProps = {
  [WindowType.MESSAGE]: MessageWindowProps;
  [WindowType.FRIEND]: GeneralWindowProps;
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

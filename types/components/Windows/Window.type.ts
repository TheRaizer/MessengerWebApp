import { PointerEventHandler, ReactNode } from 'react';
import { WindowIdentifier } from '../../redux/states/windows.type';

export type WindowProps = {
  title: string;
  windowId: WindowIdentifier;
  children: ReactNode;
};

export type WindowHeaderProps = {
  title: string;
  windowId: WindowIdentifier;
  onPointerDown: PointerEventHandler<HTMLElement>;
};

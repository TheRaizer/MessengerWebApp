import { PointerEventHandler, ReactNode } from 'react';

export type WindowProps = {
  title: string;
  children: ReactNode;
};

export type WindowHeaderProps = {
  title: string;
  onPointerDown: PointerEventHandler<HTMLElement>;
};

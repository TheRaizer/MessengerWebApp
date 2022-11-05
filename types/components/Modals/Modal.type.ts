import { ReactElement } from 'react';
import { ModalType } from '../../redux/states/modalState.type';

export type ModalProps = {
  [ModalType.RESET_PASSWORD]?: {
    password: string;
  };
};

export type ModalComponent = (props: {
  [K in keyof ModalProps]: ModalProps[K];
}) => ReactElement;

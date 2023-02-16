import { Fragment, ReactElement } from 'react';
import { useSocketListeners } from '../../hooks/lifecycles/useSocketListeners';

export const SocketListeners = (): ReactElement => {
  useSocketListeners();

  return <Fragment />;
};

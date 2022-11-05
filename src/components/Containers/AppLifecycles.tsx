import { Fragment, ReactElement } from 'react';
import { useAppLifecycle } from '../../hooks/lifecycles/useAppLifecycle';

export const AppLifecycle = (): ReactElement => {
  useAppLifecycle();

  return <Fragment />;
};

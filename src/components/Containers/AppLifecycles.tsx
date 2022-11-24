import { Fragment, ReactElement } from 'react';
import { useAppLifecycle } from '../../hooks/lifecycles/useAppLifecycle';
import { useAuth } from '../../hooks/lifecycles/useAuth';

export const AppLifecycle = (): ReactElement => {
  useAppLifecycle();
  useAuth();

  return <Fragment />;
};

import useMobileTheme from './useMobileTheme';
import { useUserStatusSocket } from './sockets/useUserStatusSocket';
import { useSocketConnection } from './sockets/useSocketConnection';

export const useAppLifecycle = () => {
  useMobileTheme();
  useSocketConnection();
  useUserStatusSocket();
};

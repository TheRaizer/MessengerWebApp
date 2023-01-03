import useMobileTheme from './useMobileTheme';
import { useUserStatusSocket } from './sockets/useUserStatusSocket';
import { useSocketConnection } from './sockets/useSocketConnection';
import { useAuth } from './useAuth';

export const useAppLifecycle = () => {
  useAuth();
  useMobileTheme();
  useSocketConnection();
  useUserStatusSocket();
};

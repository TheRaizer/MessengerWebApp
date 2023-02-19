import { useMessageSocket } from './sockets/useMessageSocket';
import { useSocketConnection } from './sockets/useSocketConnection';
import { useUserStatusSocket } from './sockets/useUserStatusSocket';

export const useSocketListeners = () => {
  useSocketConnection();
  useUserStatusSocket();
  useMessageSocket();
};

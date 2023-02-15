import { useSocketConnection } from './sockets/useSocketConnection';
import { useUserStatusSocket } from './sockets/useUserStatusSocket';

export const useSocketListeners = () => {
  useSocketConnection();
  useUserStatusSocket();
};

import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../../types/socketio.type';
import { selectUser } from '../../../redux/slices/userSlice';
import { useAppSelector } from '../../../redux/hooks';
import { CookieKeys, getCookie } from '../../../helpers/cookie';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const useSocket = () => {
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) return;

    if (!socket) {
      const socketioAccessToken = getCookie(CookieKeys.SOCKETIO_ACCESS_TOKEN);
      socket = io(process.env.SOCKET_URL as string, {
        path: '/ws/socket.io',
        transports: ['websocket', 'polling'],
        auth: {
          access_token: socketioAccessToken,
        },
      });
    } else if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      socket?.disconnect();
    };
  }, [user]);

  return socket;
};

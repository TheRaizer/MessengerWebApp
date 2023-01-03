import { CookieKeys } from './../cookie';
import { getCookie } from '../cookie';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './../../../types/socketio.type';
import { Socket } from 'socket.io-client';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const getSocket = async (): Promise<
  Socket<ServerToClientEvents, ClientToServerEvents>
> => {
  if (!socket) {
    const access_token = getCookie(CookieKeys.ACCESS_TOKEN);

    if (!access_token) throw Error('not authenticated');

    const { io } = await import('socket.io-client');
    socket = io(process.env.SOCKET_URL as string, {
      path: '/ws/socket.io',
      transports: ['websocket'],
      query: { [CookieKeys.ACCESS_TOKEN]: access_token },
    });
  }

  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

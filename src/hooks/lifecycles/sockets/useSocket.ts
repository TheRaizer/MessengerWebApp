import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../../types/socketio.type';
import { selectUser } from '../../../redux/slices/userSlice';
import { useAppSelector } from '../../../redux/hooks';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const useSocket = () => {
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) return;

    if (!socket) {
      socket = io(process.env.SOCKET_URL as string, {
        path: '/ws/socket.io',
        transports: ['websocket', 'polling'],
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

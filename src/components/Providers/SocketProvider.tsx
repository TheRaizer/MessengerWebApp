import { ReactElement, createContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../types/socketio.type';
import { getCookie, CookieKeys } from '../../helpers/cookie';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/slices/userSlice';

export const socketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const { user } = useAppSelector(selectUser);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) return;

    const socketioAccessToken = getCookie(CookieKeys.SOCKETIO_ACCESS_TOKEN);
    const createdSocket = io(process.env.SOCKET_URL as string, {
      path: '/ws/socket.io',
      transports: ['websocket', 'polling'],
      auth: {
        access_token: socketioAccessToken,
      },
    });
    createdSocket.connect();
    setSocket(createdSocket);
  }, [user]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  });

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

import { ReactElement, createContext } from 'react';
import { useSocket } from '../../hooks/lifecycles/sockets/useSocket';
import { Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../types/socketio.type';

export const socketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const socket = useSocket();

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

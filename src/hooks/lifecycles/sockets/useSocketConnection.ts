import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { socketContext } from '../../../components/Providers/SocketProvider';

export const useSocketConnection = (): void => {
  const router = useRouter();
  const socket = useContext(socketContext);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connect');
    });
    socket?.on('disconnect', () => {
      console.log('disconnect');
    });

    return () => {
      socket?.removeListener('connect');
      socket?.removeListener('disconnect');
    };
  }, [router.pathname, socket]);
};

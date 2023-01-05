import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from './useSocket';

export const useSocketConnection = (): void => {
  const router = useRouter();
  const socket = useSocket();

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

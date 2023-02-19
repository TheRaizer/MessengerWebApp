import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { socketContext } from '../../../components/Providers/SocketProvider';

export const useMessageSocket = (): void => {
  const router = useRouter();
  const socket = useContext(socketContext);

  useEffect(() => {
    socket?.on('message response', (data) => {
      console.log(data);
    });
  }, [router.pathname, socket]);
};

import { useEffect } from 'react';
import { getSocket } from '../../../helpers/sockets/socketio';

export const useSocketConnection = (): void => {
  useEffect(() => {
    getSocket()
      .then((socket) => {
        socket.on('connect', () => {
          console.log('connect');
        });
        socket.on('disconnect', () => {
          console.log('disconnect');
        });
      })
      .catch((err) => console.error(err));

    return () => {
      getSocket()
        .then((socket) => {
          socket.off('connect');
          socket.off('disconnect');
        })
        .catch((err) => console.error(err));
    };
  }, []);
};

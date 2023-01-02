import { useEffect } from 'react';
import { getSocket } from '../../../helpers/sockets/socketio';
import { useAppDispatch } from '../../../redux/hooks';
import { addOrUpdateStatus } from '../../../redux/slices/friendStatusesSlice';
import { ActiveStatus } from '../../../../types/components/Windows/FriendList/FriendItem.type';

export const useUserStatusSocket = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSocket()
      .then((socket) => {
        socket.on('status change', (data) => {
          dispatch(addOrUpdateStatus(data));
          console.log('status change');
          console.log(data);

          socket.emit('broadcast_current_status_to_friend', {
            user_id: data.user_id,
            status: ActiveStatus.ACTIVE,
          });
        });

        socket.on('friend status change', (data) => {
          dispatch(addOrUpdateStatus(data));
          console.log('friend status change');
          console.log(data);
        });
      })
      .catch((err) => console.error(err));

    return () => {
      getSocket()
        .then((socket) => {
          socket.off('status change');
        })
        .catch((err) => console.error(err));
    };
  }, [dispatch]);
};

import { useEffect } from 'react';
import { getSocket } from '../../../helpers/sockets/socketio';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addOrUpdateStatus } from '../../../redux/slices/friendStatusesSlice';
import { ActiveStatus } from '../../../../types/components/Windows/FriendList/FriendItem.type';
import { selectUser } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/router';

export const useUserStatusSocket = (): void => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    getSocket()
      .then((socket) => {
        // this will fire if one of your friend's is broadcasting their status
        // to all their friends on initial connection.
        socket.on('status change', (data) => {
          dispatch(addOrUpdateStatus(data));

          // send a active status to the friend that sent you their new status
          socket.emit('broadcast_current_status_to_friend', {
            user_id: user.user_id,
            status: ActiveStatus.ACTIVE,
            friend_id: data.user_id,
          });
        });

        // if a friend's status has changed this will fire
        socket.on('friend status change', (data) => {
          dispatch(addOrUpdateStatus(data));
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
  }, [dispatch, user, router.pathname]);
};

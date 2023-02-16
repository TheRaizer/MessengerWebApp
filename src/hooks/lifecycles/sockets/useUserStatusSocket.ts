import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addOrUpdateStatus } from '../../../redux/slices/friendStatusesSlice';
import { selectUser } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import { ActiveStatus } from '../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { socketContext } from '../../../components/Providers/SocketProvider';

export const useUserStatusSocket = (): void => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const router = useRouter();
  const socket = useContext(socketContext);

  useEffect(() => {
    /**
     * On initial connection to the socket the server will emit
     * "ping status change" events to all your friends. Thus you will listen to
     * any "ping status change" events to detect whether your friends' status has changed.
     * On recieving a "ping status change" event, you will send back a "pong status change"
     * event back to your friend.
     *
     * To avoid infinite recursion within these two events, we create a third event called
     * "friend status changed" which will be called from the server when "pong status change"
     * is invoked.
     */
    if (!user) return;

    socket?.on('ping status change', (data) => {
      dispatch(addOrUpdateStatus(data));

      // send a active status to the friend that sent you their new status
      socket.emit('pong status change', {
        user_id: user.user_id,
        status: ActiveStatus.ACTIVE,
        friend_id: data.user_id,
      });
    });

    socket?.on('friend status changed', (data) => {
      dispatch(addOrUpdateStatus(data));
    });

    return () => {
      socket?.removeListener('ping status change');
      socket?.removeListener('friend status changed');
    };
  }, [dispatch, user, router.pathname, socket]);
};

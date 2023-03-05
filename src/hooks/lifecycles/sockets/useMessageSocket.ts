import { selectPendingMessages } from './../../../redux/slices/pendingMessagesSlice';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { socketContext } from '../../../components/Providers/SocketProvider';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/slices/userSlice';
import { removePendingMessage } from '../../../redux/slices/pendingMessagesSlice';
import { MessageModel } from '../../../../types/Models/MessageModel.type';
import { useSWRConfig } from 'swr';

export const useMessageSocket = (): void => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const pendingMessages = useAppSelector(selectPendingMessages);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const socket = useContext(socketContext);

  useEffect(() => {
    if (!user) return;

    socket?.on('message response', (data) => {
      if (data.detail !== undefined) {
        // message failed to send
      }

      if (data.message === undefined) {
        throw new Error('message object was not recieved');
      }
      const message = JSON.parse(data.message) as MessageModel;

      if (
        message.reciever_id !== user.user_id &&
        data.message_tracking_id !== undefined
      ) {
        // you have successfully sent a message
        dispatch(
          removePendingMessage({
            recieverId: message.reciever_id,
            message_tracking_id: data.message_tracking_id,
          })
        );
      } else {
        // you recieved a message
        // TODO: emit toast popup
      }
    });

    return () => {
      socket?.removeListener('message response');
    };
  }, [dispatch, mutate, pendingMessages, router.pathname, socket, user]);
};

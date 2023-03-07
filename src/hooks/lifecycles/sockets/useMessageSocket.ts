import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { socketContext } from '../../../components/Providers/SocketProvider';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/slices/userSlice';
import { MessageModel } from '../../../../types/Models/MessageModel.type';
import { useSWRConfig } from 'swr';
import {
  addMessage,
  changeMessageStatus,
} from '../../../redux/slices/messagesSlice';
import { MessageStatus } from '../../../../types/redux/states/messages.type';

export const useMessageSocket = (): void => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
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
        message.sender_id == user.user_id &&
        data.message_tracking_id !== undefined
      ) {
        // you have successfully sent a message
        dispatch(
          changeMessageStatus({
            friendId: message.reciever_id,
            messageId: data.message_tracking_id,
            newStatus: MessageStatus.SENT,
          })
        );
      }

      if (message.sender_id != user.user_id) {
        dispatch(
          addMessage({
            friendId: message.sender_id,
            messageId: message.message_id,
            message: message,
            messageStatus: MessageStatus.SENT,
          })
        );
      }
    });

    return () => {
      socket?.removeListener('message response');
    };
  }, [dispatch, mutate, router.pathname, socket, user]);
};

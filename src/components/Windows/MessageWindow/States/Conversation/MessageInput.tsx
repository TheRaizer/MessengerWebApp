import { ReactElement, useCallback, useContext, useRef, useState } from 'react';
import { Input } from '../../../../common/Input';
import { socketContext } from '../../../../Providers/SocketProvider';
import { sanitize } from 'dompurify';
import { MessageInputProps } from '../../../../../../types/components/Windows/MessageWindow/States/Conversation/MessageInput.type';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  addPendingMessage,
  selectPendingMessages,
} from '../../../../../redux/slices/pendingMessagesSlice';
import { selectUser } from '../../../../../redux/slices/userSlice';
import { MessageModel } from '../../../../../../types/Models/MessageModel.type';

const Styled = {
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    padding: 0px 10px 5px 10px;
  `,
};

export const MessageInput = ({
  friendUsername,
  friendId,
  onMessageEmit,
}: MessageInputProps): ReactElement => {
  const { user } = useAppSelector(selectUser);
  const pendingMessages = useAppSelector(selectPendingMessages);
  const socket = useContext(socketContext);
  const [content, setContent] = useState('');
  const counter = useRef(
    pendingMessages[friendId]
      ? Object.keys(pendingMessages[friendId]).length
      : 0
  );

  const dispatch = useAppDispatch();

  const emitMessageToFriend = useCallback(
    (content: string) => {
      if (!user) return;

      const message: MessageModel = {
        reciever_id: friendId,
        sender_id: user.user_id,
        content: content,
        group_chat_id: null,
        message_tracking_id: counter.current,
        created_date_time: new Date().toString(),
        last_edited_date_time: null,
        message_id: counter.current,
        seen: false,
      };

      dispatch(
        addPendingMessage({
          recieverId: friendId,
          recieverUsername: friendUsername,
          message: message,
        })
      );

      socket?.emit('message', {
        addressee_username: friendUsername,
        content: content,
        group_chat_id: null,
        message_tracking_id: counter.current,
      });

      onMessageEmit(message);
      counter.current += 1;
    },
    [dispatch, friendId, friendUsername, onMessageEmit, socket, user]
  );

  const onEnter = () => {
    const sanitizedContent = sanitize(content);
    if (sanitizedContent !== '') {
      emitMessageToFriend(sanitizedContent);
    }
  };

  return (
    <Styled.InputContainer>
      <Input
        dimensions={{ width: '93%' }}
        labelText={`Message ${friendUsername}`}
        onChange={(evt) => setContent(evt.target.value)}
        onEnter={onEnter}
      />
    </Styled.InputContainer>
  );
};

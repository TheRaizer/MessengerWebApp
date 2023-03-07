import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Input } from '../../../../common/Input';
import { socketContext } from '../../../../Providers/SocketProvider';
import { sanitize } from 'dompurify';
import { MessageInputProps } from '../../../../../../types/components/Windows/MessageWindow/States/Conversation/MessageInput.type';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { selectUser } from '../../../../../redux/slices/userSlice';
import { MessageModel } from '../../../../../../types/Models/MessageModel.type';
import { addMessage } from '../../../../../redux/slices/messagesSlice';
import { MessageStatus } from '../../../../../../types/redux/states/messages.type';
import { v4 as uuidv4 } from 'uuid';

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
}: MessageInputProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector(selectUser);
  const socket = useContext(socketContext);
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const emitMessageToFriend = useCallback(
    (content: string) => {
      if (!user) return;

      const message_tracking_id = uuidv4();

      const message: MessageModel = {
        reciever_id: friendId,
        sender_id: user.user_id,
        content: content,
        group_chat_id: null,
        message_tracking_id: message_tracking_id,
        created_date_time: new Date().toString(),
        last_edited_date_time: null,
        message_id: message_tracking_id,
        seen: false,
      };

      dispatch(
        addMessage({
          friendId: friendId,
          messageId: message_tracking_id,
          messageStatus: MessageStatus.SENDING,
          message: message,
        })
      );

      socket?.emit('message', {
        addressee_username: friendUsername,
        content: content,
        group_chat_id: null,
        message_tracking_id: message_tracking_id,
      });
      if (inputRef.current) inputRef.current.value = '';
    },
    [dispatch, friendId, friendUsername, socket, user]
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
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setContent(evt.target.value)
        }
        onEnter={onEnter}
        ref={inputRef}
      />
    </Styled.InputContainer>
  );
};

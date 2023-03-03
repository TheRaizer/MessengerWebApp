import { ReactElement, useCallback, useContext, useState } from 'react';
import { Input } from '../../../../common/Input';
import { socketContext } from '../../../../Providers/SocketProvider';
import { CookieKeys, getCookie } from '../../../../../helpers/cookie';
import { sanitize } from 'dompurify';
import { MessageInputProps } from '../../../../../../types/components/Windows/MessageWindow/States/Conversation/MessageInput.type';
import styled from 'styled-components';

const Styled = {
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    padding: 0px 10px 5px 10px;
  `,
};

export const MessageInput = ({
  friendUsername,
}: MessageInputProps): ReactElement => {
  const socket = useContext(socketContext);
  const [content, setContent] = useState('');

  const emitMessageToFriend = useCallback(
    (content: string) => {
      const socketioAccessToken = getCookie(CookieKeys.SOCKETIO_ACCESS_TOKEN);

      socket?.emit('message', {
        addressee_username: friendUsername,
        content: content,
        group_chat_id: null,
        access_token: socketioAccessToken,
      });
    },
    [friendUsername, socket]
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

import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { MessageProps } from '../../../../../../types/components/Windows/MessageWindow/States/Conversation/Message.type';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectUser } from '../../../../../redux/slices/userSlice';
import { Col } from '../../../../common/Col';
import { getFormattedLocalTimeString } from '../../../../../helpers/datetime';
import { selectMessages } from '../../../../../redux/slices/messagesSlice';
import { MessageStatus } from '../../../../../../types/redux/states/messages.type';

const Styled = {
  PositioningContainer: styled.div<{ justifyEnd: boolean; isPending: boolean }>`
    width: 100%;
    display: flex;
    justify-content: ${({ justifyEnd }) =>
      justifyEnd ? 'flex-end' : 'flex-start'};
    padding: 0px 10px;
    padding-bottom: ${({ isPending }) => isPending && '10'}px;
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    min-height: 35px;
    gap: 7px;
  `,
  Icon: styled.div`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  `,
  ContentContainer: styled(Col)`
    padding: 0px 10px;
    max-width: 230px;
    height: 100%;
    border: 1px solid black;
    justify-content: center;
    position: relative;
  `,
  Header: styled.div<{ alignTextLeft: boolean }>`
    display: flex;
    gap: 10px;
    text-align: ${({ alignTextLeft }) => (alignTextLeft ? 'left' : 'right')};
    opacity: 0.4;
    font-size: 0.8em;
    justify-content: space-between;
  `,
  MessageStatus: styled.p`
    position: absolute;
    bottom: -15px;
    font-size: 0.7em;
  `,
};

export const Message = ({
  content,
  created_date_time,
  friendUsername,
  sender_id,
  reciever_id,
  message_tracking_id,
}: MessageProps): ReactElement => {
  const messages = useAppSelector(selectMessages);
  const { user } = useAppSelector(selectUser);

  const isPending = useMemo(() => {
    if (messages[reciever_id]) {
      const message = messages[reciever_id].find(
        (messageData) => messageData.message.message_id == message_tracking_id
      );

      if (message !== undefined) {
        return message.messageStatus === MessageStatus.SENDING;
      }
    }
    return false;
  }, [message_tracking_id, messages, reciever_id]);

  const senderIsUser = user?.user_id == sender_id;
  const username = senderIsUser ? user?.username || '' : friendUsername;
  const createdDateTime =
    new Date(created_date_time).toLocaleDateString() +
    ' ' +
    getFormattedLocalTimeString(new Date(created_date_time));

  return (
    <Styled.PositioningContainer
      justifyEnd={senderIsUser}
      isPending={isPending}
    >
      <Styled.Container>
        {!senderIsUser && (
          <Styled.Icon>
            <p>{username[0].toUpperCase()}</p>
          </Styled.Icon>
        )}
        <Styled.ContentContainer>
          <Styled.Header alignTextLeft={senderIsUser}>
            {!senderIsUser && <p>{friendUsername}</p>}
            <p>{createdDateTime}</p>
          </Styled.Header>
          <p>{content}</p>
          {isPending && <Styled.MessageStatus>sending...</Styled.MessageStatus>}
        </Styled.ContentContainer>
        {senderIsUser && (
          <Styled.Icon>
            <p>{username[0].toUpperCase()}</p>
          </Styled.Icon>
        )}
      </Styled.Container>
    </Styled.PositioningContainer>
  );
};

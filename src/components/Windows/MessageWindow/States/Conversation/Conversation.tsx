import { ReactElement, useMemo } from 'react';
import { FriendItemProps } from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';
import { MessageModel } from '../../../../../../types/Models/MessageModel.type';
import { MESSAGES_LIMIT } from '../../../../../constants/pagination';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../../../hooks/data/usePaginateInView';
import {
  MessageWindowStateProps,
  MessageWindowStates,
} from '../../../../../../types/components/Windows/MessageWindow/MessageWindow.type';
import { ChangeStateProp } from '../../../../../../types/hooks/useStateMachine.type';
import styled from 'styled-components';
import { Message } from './Message';
import { Col } from '../../../../common/Col';

const Styled = {
  MessageList: styled(Col)`
    overflow-y: auto;
    height: 100%;
    flex-direction: column-reverse;
  `,
};

export const Conversation = ({
  friendUsername,
  friendId,
}: Omit<FriendItemProps, 'mutate'> &
  ChangeStateProp<
    MessageWindowStates,
    MessageWindowStateProps
  >): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    'messages',
    cursorPaginationFetcher<MessageModel>(),
    cursorPaginationHasMoreData<MessageModel>(),
    MESSAGES_LIMIT,
    undefined,
    `friend_username=${friendUsername}`
  );

  const messages = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  return (
    <Styled.MessageList as="ul" gap={20}>
      {messages?.map((message) => (
        <li key={message.message_id}>
          <Message
            content={message.content}
            createdDate={message.created_date_time}
            friendUsername={friendUsername}
            senderId={message.sender_id}
          />
        </li>
      ))}
    </Styled.MessageList>
  );
};

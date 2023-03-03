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
import { FriendLoadingSpinner } from '../../../FriendWindow/States/FriendList/States/common/FriendLoadingSpinner';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectFriendStatuses } from '../../../../../redux/slices/friendStatusesSlice';
import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';
import { WindowScrollBar } from '../../../../common/WindowScrollBar';
import { MessageInput } from './MessageInput';

const BsArrowLeftCircle = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsArrowLeftCircle)
);

const Styled = {
  MessageListContainer: styled(Col)`
    height: 100%;
  `,
  MessageList: styled(Col)`
    padding: 10px 0px;
    overflow-y: auto;
    height: 100%;
    flex-direction: column-reverse;
    ${WindowScrollBar}

    &::-webkit-scrollbar-track {
      border-bottom: 1px solid black;
    }
  `,
  Header: styled.div`
    display: flex;
    padding: 7px;
    border-bottom: 1px solid black;
    box-shadow: 0px 2px 7px rgb(0 0 0 / 20%);
    align-items: center;
    gap: 10px;
    font-size: 1.1em;
  `,
  Status: styled.p`
    font-size: 0.7em;
  `,
  BackIcon: styled(BsArrowLeftCircle)`
    cursor: pointer;
    margin-right: 5px;
  `,
};

export const Conversation = ({
  friendUsername,
  friendId,
  changeState,
}: Omit<FriendItemProps, 'mutate'> &
  ChangeStateProp<
    MessageWindowStates,
    MessageWindowStateProps
  >): ReactElement => {
  const friendStatuses = useAppSelector(selectFriendStatuses);
  const hasMoreData = cursorPaginationHasMoreData<MessageModel>();
  const { data, ref, mutate } = usePaginateInView(
    'messages',
    cursorPaginationFetcher<MessageModel>(),
    hasMoreData,
    MESSAGES_LIMIT,
    undefined,
    `friend_username=${friendUsername}`
  );

  const messages = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  return (
    <Styled.MessageListContainer>
      <Styled.Header>
        <Styled.BackIcon
          size={'1.4em'}
          onClick={() =>
            changeState(MessageWindowStates.CONVERSATIONS_LIST, {
              changeState,
              friendId,
              friendUsername,
            })
          }
        />
        <p>{friendUsername}</p>
        <Styled.Status>{friendStatuses[friendId] || 'offline'}</Styled.Status>
      </Styled.Header>
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
        {hasMoreData(data) && <FriendLoadingSpinner ref={ref} />}
      </Styled.MessageList>
      <MessageInput friendUsername={friendUsername} />
    </Styled.MessageListContainer>
  );
};

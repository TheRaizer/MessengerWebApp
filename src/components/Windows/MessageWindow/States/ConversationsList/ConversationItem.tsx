import { ReactElement, useMemo } from 'react';
import { FriendItemProps } from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';
import { FriendInfo } from '../../../FriendWindow/States/FriendList/States/common/FriendInfo';
import { MESSAGES_LIMIT } from '../../../../../constants/pagination';
import { cursorPaginationFetcher } from '../../../../../helpers/swr/cursorPaginationFetcher';
import { nextCursorSWRGetKey } from '../../../../../helpers/pagination';
import useSWRInfinite from 'swr/infinite';
import { MessageModel } from '../../../../../../types/Models/MessageModel.type';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import {
  MessageWindowStates,
  MessageWindowStateProps,
} from '../../../../../../types/components/Windows/MessageWindow/MessageWindow.type';
import { ChangeStateProp } from '../../../../../../types/hooks/useStateMachine.type';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectMessages } from '../../../../../redux/slices/messagesSlice';
import { MessageStatus } from '../../../../../../types/redux/states/messages.type';

const Styled = {
  LatestMessage: styled.p`
    width: 90px;
    opacity: 0.5;
    font-size: 0.9em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  SkeletonContainer: styled.div`
    padding: 0px 10px;
    display: flex;
    width: 80%;
    gap: 10px;
  `,
};

export const ConversationItem = ({
  friendUsername,
  friendId,
  changeState,
}: Omit<FriendItemProps, 'mutate'> &
  ChangeStateProp<
    MessageWindowStates,
    MessageWindowStateProps
  >): ReactElement | null => {
  const storedMessages = useAppSelector(selectMessages);
  const getKey = nextCursorSWRGetKey(
    'messages',
    MESSAGES_LIMIT,
    `friend_username=${friendUsername}`
  );

  const activeMessages:
    | undefined
    | {
        message: MessageModel;
        messageStatus: MessageStatus;
      }[] = storedMessages[friendId];

  const { data } = useSWRInfinite(
    getKey,
    cursorPaginationFetcher<MessageModel>(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateFirstPage: false,
    }
  );

  const messages = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  if (messages === undefined)
    return (
      <Styled.SkeletonContainer>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={'100%'} height={40} />
      </Styled.SkeletonContainer>
    );

  if (
    messages.length === 0 &&
    (activeMessages === undefined || activeMessages?.length === 0)
  )
    return null;

  return (
    <FriendInfo
      friendUsername={friendUsername}
      friendId={friendId}
      onClick={() =>
        changeState(MessageWindowStates.CONVERSATION, {
          friendId,
          friendUsername,
          changeState,
        })
      }
    >
      <Styled.LatestMessage>
        {activeMessages?.length > 0
          ? activeMessages[0].message.content
          : messages?.[0]?.content}
      </Styled.LatestMessage>
    </FriendInfo>
  );
};

import { ReactElement, useMemo } from 'react';
import { FriendItemProps } from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';
import { FriendInfo } from '../../../FriendWindow/States/FriendList/States/common/FriendInfo';
import { MESSAGES_LIMIT } from '../../../../../constants/pagination';
import { cursorPaginationFetcher } from '../../../../../helpers/swr/cursorPaginationFetcher';
import { nextCursorSWRGetKey } from '../../../../../helpers/pagination';
import useSWRInfinite from 'swr/infinite';
import { MessageModel } from '../../../../../../types/Models/MessageModel.type';
import styled from 'styled-components';

const Styled = {
  LatestMessage: styled.p`
    width: 90px;
    opacity: 0.5;
    font-size: 0.9em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `
}

export const ConversationItem = ({
  friendUsername,
  friendId,
}: Omit<FriendItemProps, 'mutate'>): ReactElement | null => {
  const getKey = nextCursorSWRGetKey('messages', MESSAGES_LIMIT, `friend_username=${friendUsername}`);

  const { data } = useSWRInfinite(
    getKey,
    cursorPaginationFetcher<MessageModel>(),
  );

  const messages = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  if(!messages || messages.length === 0) return null;

  return (
    <FriendInfo friendUsername={friendUsername} friendId={friendId}>
      <Styled.LatestMessage>{messages?.[0]?.content}</Styled.LatestMessage>
    </FriendInfo>
  );
};

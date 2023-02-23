import { ReactElement, useMemo } from 'react';
import { PublicUserModel } from '../../../../../../../../types/Models/User.type';
import { cursorPaginationHasMoreData } from '../../../../../../../helpers/swr/cursorPaginationFetcher';
import { FriendLoadingSpinner } from './FriendLoadingSpinner';
import { FriendItemsListProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/States/common/FriendItemsList.type';
import React from 'react';
import styled from 'styled-components';
import { Col } from '../../../../../../common/Col';

const Styled = {
  FriendsListContainer: styled(Col)`
    height: 100%;
    width: 100%;
    gap: 5px;
    overflow-y: auto;
    border-top: 1px solid black;

    /* width */
    &::-webkit-scrollbar {
      width: 23px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--primary-color-2);
      border-left: 1px solid black;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-left: 1px solid black;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      background: var(--primary-color);
    }
  `,
};

export const FriendItemsList = React.forwardRef<
  HTMLDivElement,
  FriendItemsListProps
>(({ data, ItemComponent, mutate }, ref): ReactElement => {
  const hasMoreData = cursorPaginationHasMoreData<PublicUserModel>();

  const friends = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  return (
    <Styled.FriendsListContainer as="ul">
      {friends?.map((friend) => (
        <ItemComponent
          key={friend.user_id}
          friendUsername={friend.username}
          friendId={friend.user_id}
          mutate={mutate}
        />
      ))}
      {!friends && <FriendLoadingSpinner ref={ref} />}
      {hasMoreData(data) && <FriendLoadingSpinner ref={ref} />}
    </Styled.FriendsListContainer>
  );
});

FriendItemsList.displayName = 'FriendItemsList';

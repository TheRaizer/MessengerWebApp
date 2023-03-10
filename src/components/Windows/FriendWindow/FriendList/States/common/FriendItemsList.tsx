import { ReactElement, useMemo } from 'react';
import { FriendLoadingSpinner } from './FriendLoadingSpinner';
import React from 'react';
import styled from 'styled-components';
import { PublicUserModel } from '../../../../../../../types/Models/User.type';
import { FriendItemsListProps } from '../../../../../../../types/components/Windows/FriendWindow/FriendList/States/common/FriendItemsList.type';
import { cursorPaginationHasMoreData } from '../../../../../../helpers/swr/cursorPaginationFetcher';
import { Col } from '../../../../../common/Col';
import { WindowScrollBar } from '../../../../../common/WindowScrollBar';

const Styled = {
  FriendsListContainer: styled(Col)`
    height: 100%;
    width: 100%;
    gap: 5px;
    overflow-y: auto;

    ${WindowScrollBar}
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

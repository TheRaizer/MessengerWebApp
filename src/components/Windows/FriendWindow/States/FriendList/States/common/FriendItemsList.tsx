import { ReactElement, useMemo } from 'react';
import { UserModel } from '../../../../../../../../types/Models/User.type';
import { cursorPaginationHasMoreData } from '../../../../../../../helpers/swr/cursorPaginationFetcher';
import { FriendLoadingSpinner } from './FriendLoadingSpinner';
import { FriendItemsListProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/States/common/FriendItemsList.type';
import React from 'react';

export const FriendItemsList = React.forwardRef<
  HTMLDivElement,
  FriendItemsListProps
>(({ data, ItemComponent }, ref): ReactElement => {
  const hasMoreData = cursorPaginationHasMoreData<UserModel>();

  const friends = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  return (
    <>
      {friends?.map((friend) => (
        <ItemComponent
          key={friend.user_id}
          friendUsername={friend.username}
          friendId={friend.user_id}
        />
      ))}
      {hasMoreData(data) && <FriendLoadingSpinner ref={ref} />}
    </>
  );
});

FriendItemsList.displayName = 'FriendItemsList';

import { ReactElement, useMemo } from 'react';
import { PublicUserModel } from '../../../../../../../../types/Models/User.type';
import { cursorPaginationHasMoreData } from '../../../../../../../helpers/swr/cursorPaginationFetcher';
import { FriendLoadingSpinner } from './FriendLoadingSpinner';
import { FriendItemsListProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/States/common/FriendItemsList.type';
import React from 'react';

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
    <>
      {friends?.map((friend) => (
        <ItemComponent
          key={friend.user_id}
          friendUsername={friend.username}
          friendId={friend.user_id}
          mutate={mutate}
        />
      ))}
      {hasMoreData(data) && <FriendLoadingSpinner ref={ref} />}
    </>
  );
});

FriendItemsList.displayName = 'FriendItemsList';

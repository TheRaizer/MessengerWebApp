import { ReactElement } from 'react';
import { ChangeStateProp } from '../../../../../../../types/hooks/useStateMachine.type';
import { usePaginateInView } from '../../../../../../hooks/data/usePaginateInView';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../../helpers/swr/cursorPaginationFetcher';
import { PublicUserModel } from '../../../../../../../types/Models/User.type';
import {
  FriendListStateProps,
  FriendListStates,
} from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import { FriendItemsList } from './common/FriendItemsList';
import { FriendItem } from './common/FriendItem';
import { FRIEND_LIMIT } from '../../../../../../constants/pagination';

export const Friends = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    '/friends',
    cursorPaginationFetcher<PublicUserModel>(),
    cursorPaginationHasMoreData<PublicUserModel>(),
    FRIEND_LIMIT
  );

  return (
    <FriendItemsList
      data={data}
      mutate={mutate}
      ref={ref}
      ItemComponent={FriendItem}
    />
  );
};

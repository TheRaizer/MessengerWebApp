import { ReactElement } from 'react';
import { FriendItemsList } from './common/FriendItemsList';
import { FriendItem } from './common/FriendItem/FriendItem';
import { PublicUserModel } from '../../../../../../types/Models/User.type';
import {
  FriendListStates,
  FriendListStateProps,
} from '../../../../../../types/components/Windows/FriendWindow/FriendList/FriendList.type';
import { ChangeStateProp } from '../../../../../../types/hooks/useStateMachine.type';
import { FRIEND_LIMIT } from '../../../../../constants/pagination';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../../../hooks/data/usePaginateInView';

export const Friends = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    'friends',
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

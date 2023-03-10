import { ReactElement } from 'react';
import { FriendItemsList } from './common/FriendItemsList';
import { SentItem } from './common/AddressRequestItem/SentItem';
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

export const Sent = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    'friends/requests/recievers',
    cursorPaginationFetcher<PublicUserModel>(),
    cursorPaginationHasMoreData<PublicUserModel>(),
    FRIEND_LIMIT
  );

  return (
    <FriendItemsList
      mutate={mutate}
      data={data}
      ref={ref}
      ItemComponent={SentItem}
    />
  );
};

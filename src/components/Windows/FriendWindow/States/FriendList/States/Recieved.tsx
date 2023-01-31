import { ReactElement } from 'react';
import { ChangeStateProp } from '../../../../../../../types/hooks/useStateMachine.type';
import {
  FriendListStates,
  FriendListStateProps,
} from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import { PublicUserModel } from '../../../../../../../types/Models/User.type';
import { RESTRICT_REVALIDATION_CONFIG } from '../../../../../../constants/swrConfig';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../../../../hooks/data/usePaginateInView';
import { FriendItemsList } from './common/FriendItemsList';
import { RecievedItem } from './common/AddressRequestItem/RecievedItem';

export const Recieved = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    '/friends/requests/senders',
    cursorPaginationFetcher<PublicUserModel>(),
    cursorPaginationHasMoreData<PublicUserModel>(),
    1,
    RESTRICT_REVALIDATION_CONFIG
  );

  return (
    <FriendItemsList
      data={data}
      mutate={mutate}
      ref={ref}
      ItemComponent={RecievedItem}
    />
  );
};

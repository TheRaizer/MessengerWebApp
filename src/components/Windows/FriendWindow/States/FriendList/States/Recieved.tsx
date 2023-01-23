import { ReactElement } from 'react';
import { ChangeStateProp } from '../../../../../../../types/hooks/useStateMachine.type';
import {
  FriendListStates,
  FriendListStateProps,
} from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import { UserModel } from '../../../../../../../types/Models/User.type';
import { RESTRICT_REVALIDATION_CONFIG } from '../../../../../../constants/swrConfig';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../../../../hooks/data/usePaginateInView';
import { FriendItemsList } from './common/FriendItemsList';
import { RecievedItem } from './common/RecievedItem';

export const Recieved = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref } = usePaginateInView(
    '/friends/requests/senders',
    cursorPaginationFetcher<UserModel>(),
    cursorPaginationHasMoreData<UserModel>(),
    1,
    RESTRICT_REVALIDATION_CONFIG
  );

  return <FriendItemsList data={data} ref={ref} ItemComponent={RecievedItem}/>;
};

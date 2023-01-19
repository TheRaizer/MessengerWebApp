import { ReactElement } from 'react';
import { ChangeStateProp } from '../../../../../../../types/hooks/useStateMachine.type';
import { RESTRICT_REVALIDATION_CONFIG } from '../../../../../../constants/swrConfig';
import { usePaginateInView } from '../../../../../../hooks/data/usePaginateInView';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../../helpers/swr/cursorPaginationFetcher';
import { UserModel } from '../../../../../../../types/Models/User.type';
import {
  FriendListStateProps,
  FriendListStates,
} from '../../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendList.type';
import { FriendItemsList } from './common/FriendItemsList';

export const Friends = ({}: ChangeStateProp<
  FriendListStates,
  FriendListStateProps
>): ReactElement => {
  const { data, ref } = usePaginateInView(
    '/friend/requests/accepted',
    cursorPaginationFetcher<UserModel>(),
    cursorPaginationHasMoreData<UserModel>(),
    1,
    RESTRICT_REVALIDATION_CONFIG
  );

  return <FriendItemsList data={data} ref={ref} />;
};

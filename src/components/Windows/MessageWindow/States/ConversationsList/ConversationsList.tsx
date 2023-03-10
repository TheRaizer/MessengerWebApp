import { ReactElement } from 'react';
import { PublicUserModel } from '../../../../../../types/Models/User.type';
import { FRIEND_LIMIT } from '../../../../../constants/pagination';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../../../hooks/data/usePaginateInView';
import { ConversationItem } from './ConversationItem';
import {
  MessageWindowStateProps,
  MessageWindowStates,
} from '../../../../../../types/components/Windows/MessageWindow/MessageWindow.type';
import { ChangeStateProp } from '../../../../../../types/hooks/useStateMachine.type';
import { FriendItemProps } from '../../../../../../types/components/Windows/FriendWindow/FriendList/common/FriendItem/FriendItem.type';
import { FriendItemsList } from '../../../FriendWindow/FriendList/States/common/FriendItemsList';

export const ConversationsList = ({
  changeState,
}: ChangeStateProp<
  MessageWindowStates,
  MessageWindowStateProps
>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    'friends',
    cursorPaginationFetcher<PublicUserModel>(),
    cursorPaginationHasMoreData<PublicUserModel>(),
    FRIEND_LIMIT
  );

  const ConversationItemClickable = ({
    friendUsername,
    friendId,
  }: Omit<FriendItemProps, 'mutate'>) => (
    <ConversationItem
      friendId={friendId}
      friendUsername={friendUsername}
      changeState={changeState}
    />
  );

  return (
    <FriendItemsList
      data={data}
      mutate={mutate}
      ref={ref}
      ItemComponent={ConversationItemClickable}
    />
  );
};

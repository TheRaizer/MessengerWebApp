import { ReactElement } from 'react';
import {
  WindowProps,
  WindowType,
} from '../../../../types/redux/states/windows.type';
import { WithRequired } from '../../../../types/Required.type';
import { WindowContainer } from '../WindowContainer';
import { FriendItemsList } from '../FriendWindow/States/FriendList/States/common/FriendItemsList';
import { PublicUserModel } from '../../../../types/Models/User.type';
import { FRIEND_LIMIT } from '../../../constants/pagination';
import {
  cursorPaginationFetcher,
  cursorPaginationHasMoreData,
} from '../../../helpers/swr/cursorPaginationFetcher';
import { usePaginateInView } from '../../../hooks/data/usePaginateInView';
import { ConversationItem } from './States/ConversationsList/ConversationItem';

export const MessageWindow = ({
  usernameToMessage,
  id,
}: WithRequired<WindowProps[WindowType.MESSAGE], 'id'>): ReactElement => {
  const { data, ref, mutate } = usePaginateInView(
    'friends',
    cursorPaginationFetcher<PublicUserModel>(),
    cursorPaginationHasMoreData<PublicUserModel>(),
    FRIEND_LIMIT
  );

  return (
    <WindowContainer title={'Message'} windowId={id}>
      <FriendItemsList
        data={data}
        mutate={mutate}
        ref={ref}
        ItemComponent={ConversationItem}
      />
    </WindowContainer>
  );
};

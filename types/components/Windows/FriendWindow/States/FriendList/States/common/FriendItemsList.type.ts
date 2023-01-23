import { ComponentType } from 'react';
import { UserModel } from '../../../../../../../Models/User.type';
import { CursorPaginationResponse } from '../../../../../../../helpers/pagination.type';
import { FriendItemProps } from '../../common/FriendItem.type';

export type FriendItemsListProps = {
  data: CursorPaginationResponse<UserModel>[] | undefined;
  ItemComponent: ComponentType<FriendItemProps>;
};

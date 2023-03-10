import { ComponentType } from 'react';
import { FriendItemProps } from '../../common/FriendItem/FriendItem.type';
import { KeyedMutator } from 'swr';
import { CursorPaginationResponse } from '../../../../../../helpers/pagination.type';
import { PublicUserModel } from '../../../../../../Models/User.type';

export type FriendItemsListProps = {
  data: CursorPaginationResponse<PublicUserModel>[] | undefined;
  ItemComponent: ComponentType<FriendItemProps>;
  mutate: KeyedMutator<CursorPaginationResponse<PublicUserModel>[]>;
};

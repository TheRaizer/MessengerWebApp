import { ComponentType } from 'react';
import { PublicUserModel } from '../../../../../../../Models/User.type';
import { CursorPaginationResponse } from '../../../../../../../helpers/pagination.type';
import { FriendItemProps } from '../../common/FriendItem.type';
import { KeyedMutator } from 'swr';

export type FriendItemsListProps = {
  data: CursorPaginationResponse<PublicUserModel>[] | undefined;
  ItemComponent: ComponentType<FriendItemProps>;
  mutate: KeyedMutator<CursorPaginationResponse<PublicUserModel>[]>;
};

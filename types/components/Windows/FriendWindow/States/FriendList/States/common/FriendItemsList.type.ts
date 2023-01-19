import { UserModel } from '../../../../../../../Models/User.type';
import { CursorPaginationResponse } from '../../../../../../../helpers/pagination.type';

export type FriendItemsListProps = {
  data: CursorPaginationResponse<UserModel>[] | undefined;
};

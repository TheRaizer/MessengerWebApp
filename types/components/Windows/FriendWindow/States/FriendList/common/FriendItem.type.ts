import { KeyedMutator } from 'swr';
import { UserModel } from '../../../../../../Models/User.type';
import { CursorPaginationResponse } from '../../../../../../helpers/pagination.type';

export enum ActiveStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  DO_NOT_DISTURB = 'do not disturb',
  IDLE = 'idle',
}

export type FriendItemProps = {
  friendUsername: string;
  friendId: number;
  mutate: KeyedMutator<CursorPaginationResponse<UserModel>[]>;
};

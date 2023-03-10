import { FriendItemProps } from './FriendItem.type';

export type DetailsButtonProps = Pick<
  FriendItemProps,
  'friendUsername' | 'mutate'
>;

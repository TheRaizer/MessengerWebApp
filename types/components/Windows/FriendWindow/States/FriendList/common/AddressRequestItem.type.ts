import { FriendItemProps } from './FriendItem.type';

export type AddressRequestItemProps = {
  getRoute: (friendUsername: string) => string;
  buttonText: string;
  onClick?: () => void;
} & FriendItemProps;

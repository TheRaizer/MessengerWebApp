import { Method } from '../../../../../../helpers/api/request.type';
import { FriendItemProps } from './FriendItem/FriendItem.type';

export type AddressRequestItemProps = {
  getRoute: (friendUsername: string) => string;
  routeMethod: Method;
  buttonText: string;
  onClick?: () => void;
} & FriendItemProps;

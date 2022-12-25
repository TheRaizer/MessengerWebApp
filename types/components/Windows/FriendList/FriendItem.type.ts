export enum ActiveStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  DO_NOT_DISTURB = 'do not disturb',
  IDLE = 'idle',
}

export type FriendItemProps = {
  friendUsername: string;
  friendId: number;
};

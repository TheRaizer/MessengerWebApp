import { FriendshipModel } from '../Models/Friendship.type';
import { DefaultData } from './DefaultData';

export interface FriendshipData extends DefaultData, Partial<FriendshipModel> {}

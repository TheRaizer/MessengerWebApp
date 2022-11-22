import { DefaultData } from '../../responseData/DefaultData.type';

export type UserState = {
  user_id: number;
  username: string;
  email: string;
};

export interface UserData extends DefaultData {
  user?: UserState;
}

import { DefaultData } from '../../responseData/DefaultData';

export type UserState = {
  user?: UserStateProps;
};

export type UserStateProps = {
  user_id: number;
  username: string;
  email: string;
};

export interface UserData extends DefaultData {
  user?: UserStateProps;
}

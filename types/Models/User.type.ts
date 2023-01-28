export type UserModel = PrivateUserModel & PublicUserModel;

export type PrivateUserModel = {
  email: string;
  first_name?: string;
  last_name?: string;
  birthdate?: Date;
};

export type PublicUserModel = {
  username: string;
  user_id: number;
};

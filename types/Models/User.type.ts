export type UserModel = PrivateUserModel & PublicUserModel;

export type PrivateUserModel = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  birthdate: Date | null;
};

export type PublicUserModel = {
  username: string;
  user_id: number;
};

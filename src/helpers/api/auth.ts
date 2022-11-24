import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../../../types/pages/api/auth/auth.type';
import {
  UserData,
  UserStateProps,
} from '../../../types/redux/states/user.type';
import { AccessTokenData } from '../../../types/responseData/AccessTokenData.type';
import { fetchAuthAPI, setRes } from './api';
import jwt_decode from 'jwt-decode';
import { NextApiResponse } from 'next';

export const authenticate = async (
  route: string,
  req: AuthRequest,
  res: NextApiResponse
) => {
  const body = new URLSearchParams({
    grant_type: 'password',
    username: req.body.email,
    password: req.body.password,
  });

  const {
    data: { access_token, detail },
    res: authRes,
  } = await fetchAuthAPI<AccessTokenData>(`auth/${route}`, 'POST', body);

  if (authRes.status !== StatusCodes.CREATED) {
    console.error(detail);
    return setRes<UserData>(res, authRes.status, {
      detail,
    });
  }

  req.session.accessToken = access_token;
  await req.session.save();

  const userData = jwt_decode<UserStateProps>(access_token);

  return setRes<UserData>(res, StatusCodes.CREATED, {
    user: {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
    },
  });
};

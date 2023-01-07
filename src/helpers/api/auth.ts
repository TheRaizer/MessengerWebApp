import { CookieKeys } from './../cookie';
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
import { serialize } from 'cookie';

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

  // authenticate user and retrieve access token
  const {
    data: { access_token, detail },
    res: authRes,
  } = await fetchAuthAPI<AccessTokenData>(`${route}`, 'POST', body);

  if (authRes.status !== StatusCodes.CREATED) {
    console.error(detail);
    return setRes<UserData>(res, authRes.status, {
      detail,
    });
  }

  // retrieve socketio token for socket connection authentication
  const {
    data: { access_token: socketioToken, detail: socketioDetail },
    res: socketioAuthRes,
  } = await fetchAuthAPI<AccessTokenData>('socket-ticket', 'POST', body);

  if (socketioAuthRes.status !== StatusCodes.CREATED) {
    console.error(detail);
    return setRes<UserData>(res, socketioAuthRes.status, {
      detail: socketioDetail,
    });
  }

  const secure = process.env.NODE_ENV === 'production';

  // set cookies for access tokens
  res.setHeader('Set-Cookie', [
    serialize(CookieKeys.ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: secure,
      path: '/',
      sameSite: 'strict',
    }),
    serialize(CookieKeys.SOCKETIO_ACCESS_TOKEN, socketioToken, {
      secure: secure,
      path: '/',
      sameSite: 'strict',
    }),
  ]);

  try {
    const userData = jwt_decode<UserStateProps>(access_token);
    return setRes<UserData>(res, StatusCodes.CREATED, {
      user: {
        user_id: userData.user_id,
        username: userData.username,
        email: userData.email,
      },
    });
  } catch (err) {
    console.error(err);
    return setRes<UserData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      detail: 'access token could not be decoded',
    });
  }
};

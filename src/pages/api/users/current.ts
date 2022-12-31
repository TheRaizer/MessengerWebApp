import { NextApiResponse } from 'next';
import { withAuthRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { enforceMethod, setRes } from '../../../helpers/api/api';
import { StatusCodes } from 'http-status-codes';
import {
  UserStateProps,
  UserData,
} from '../../../../types/redux/states/user.type';
import jwt_decode from 'jwt-decode';
import { Method } from '../../../../types/helpers/api/request.type';
import { isValidAccessToken } from '../../../helpers/api/aws';

const currentUserRoute = async (
  req: AuthRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  enforceMethod<UserData>(res, req.method as Method, 'GET', {});

  if (!accessToken) {
    return setRes<UserData>(res, StatusCodes.NOT_FOUND, {
      detail: 'no access token was found',
    });
  }

  const isValidToken = await isValidAccessToken(accessToken);

  if (!isValidToken) {
    return setRes<UserData>(res, StatusCodes.UNAUTHORIZED, {
      detail: 'token is invalid',
    });
  }

  const userData = jwt_decode<UserStateProps>(accessToken);

  return setRes<UserData>(res, StatusCodes.OK, {
    user: {
      user_id: userData.user_id,
      username: userData.username,
      email: userData.email,
    },
  });
};

export default withAuthRoute(currentUserRoute);

import { NextApiResponse } from 'next';
import { withAuthRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { DefaultData } from '../../../../types/responseData/DefaultData';
import { StatusCodes } from 'http-status-codes';
import { enforceMethod, setRes } from '../../../helpers/api/api';
import { Method } from '../../../../types/helpers/api/request.type';
import { CookieKeys, deleteHttpOnlyCookie } from '../../../helpers/cookie';

const signoutRoute = (req: AuthRequest, res: NextApiResponse) => {
  enforceMethod<DefaultData>(res, req.method as Method, 'PUT', {});

  deleteHttpOnlyCookie(CookieKeys.ACCESS_TOKEN, res);

  // TODO: find a way to clear all cached data set by cache-control header in friends route
  res.setHeader('Clear-Site-Data', 'cache');

  return setRes<DefaultData>(res, StatusCodes.OK, {});
};

export default withAuthRoute(signoutRoute);

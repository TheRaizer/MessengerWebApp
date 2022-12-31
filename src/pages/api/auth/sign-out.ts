import { NextApiResponse } from 'next';
import { withAuthRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { DefaultData } from '../../../../types/responseData/DefaultData.type';
import { StatusCodes } from 'http-status-codes';
import { enforceMethod, setRes } from '../../../helpers/api/api';
import { Method } from '../../../../types/helpers/api/request.type';

const signoutRoute = (req: AuthRequest, res: NextApiResponse) => {
  enforceMethod<DefaultData>(res, req.method as Method, 'PUT', {});

  res.setHeader('Set-Cookie', `access_token=''; Path=/; Max-Age=-1`);
  return setRes<DefaultData>(res, StatusCodes.OK, {});
};

export default withAuthRoute(signoutRoute);

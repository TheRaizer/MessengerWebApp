import { NextApiResponse } from 'next';
import { withSessionRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { authenticate } from '../../../helpers/api/auth';
import { UserData } from '../../../../types/redux/states/user.type';
import { enforceMethod } from '../../../helpers/api/api';
import { Method } from '../../../../types/helpers/api/request.type';

const loginRoute = async (req: AuthRequest, res: NextApiResponse) => {
  enforceMethod<UserData>(res, req.method as Method, 'POST', {});
  return await authenticate('sign-in', req, res);
};

export default withSessionRoute(loginRoute);

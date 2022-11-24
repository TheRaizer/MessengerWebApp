import { NextApiResponse } from 'next';
import { withSessionRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { authenticate } from '../../../helpers/api/auth';
import { enforceMethod } from '../../../helpers/api/api';
import { UserData } from '../../../../types/redux/states/user.type';
import { Method } from '../../../../types/helpers/api/request.type';

const signUpRoute = async (req: AuthRequest, res: NextApiResponse) => {
  enforceMethod<UserData>(res, req.method as Method, 'POST', {});
  const username = req.query.username as string;
  return await authenticate(`sign-up?username=${username}`, req, res);
};

export default withSessionRoute(signUpRoute);

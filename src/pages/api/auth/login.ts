import { NextApiResponse } from 'next';
import { withSessionRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { authenticate } from '../../../helpers/api/auth';

const loginRoute = async (req: AuthRequest, res: NextApiResponse) => {
  return await authenticate('sign-in', req, res);
};

export default withSessionRoute(loginRoute);

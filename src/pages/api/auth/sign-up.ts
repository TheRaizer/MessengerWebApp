import { NextApiResponse } from 'next';
import { withSessionRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { authenticate } from '../../../helpers/api/auth';

const signUpRoute = async (req: AuthRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  return await authenticate(`sign-up?username=${username}`, req, res);
};

export default withSessionRoute(signUpRoute);

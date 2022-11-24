import { NextApiResponse } from 'next';
import { withSessionRoute } from '../../../helpers/api/session';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { DefaultData } from '../../../../types/responseData/DefaultData.type';
import { StatusCodes } from 'http-status-codes';
import { enforceMethod, setRes } from '../../../helpers/api/api';
import { Method } from '../../../../types/helpers/api/request.type';

const signoutRoute = async (req: AuthRequest, res: NextApiResponse) => {
  enforceMethod<DefaultData>(res, req.method as Method, 'PUT', {});

  req.session.accessToken = undefined;

  await req.session.save();

  return setRes<DefaultData>(res, StatusCodes.OK, {});
};

export default withSessionRoute(signoutRoute);

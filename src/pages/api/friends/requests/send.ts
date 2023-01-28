import { DefaultData } from './../../../../../types/responseData/DefaultData';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRoute } from '../../../../helpers/api/session';
import {
  enforceMethod,
  fetchServerAPI,
  setRes,
} from '../../../../helpers/api/api';
import { Method } from '../../../../../types/helpers/api/request.type';
import { StatusCodes } from 'http-status-codes';

const sendFriendRequestRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const { username }: { username?: string } = req.query;
  enforceMethod(res, req.method as Method, 'POST', {});

  try {
    const { data, res: serverRes } = await fetchServerAPI(
      `friends/requests/send?username=${username as string}`,
      'POST',
      undefined,
      undefined,
      accessToken
    );

    return setRes<DefaultData>(res, serverRes.status, data);
  } catch (err) {
    return setRes<DefaultData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      detail: 'friendship request failed to send',
    });
  }
};

export default withAuthRoute(sendFriendRequestRoute);

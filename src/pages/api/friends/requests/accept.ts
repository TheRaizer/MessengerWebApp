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

const acceptFriendRequestRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const { requester_username }: { requester_username?: string } = req.query;
  enforceMethod(res, req.method as Method, 'POST', {});

  try {
    const { data, res: serverRes } = await fetchServerAPI(
      `friends/requests/accept?requester_username=${
        requester_username as string
      }`,
      'POST',
      undefined,
      undefined,
      accessToken
    );

    return setRes<DefaultData>(res, serverRes.status, data);
  } catch (err) {
    return setRes<DefaultData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      detail: 'accepting failed',
    });
  }
};

export default withAuthRoute(acceptFriendRequestRoute);

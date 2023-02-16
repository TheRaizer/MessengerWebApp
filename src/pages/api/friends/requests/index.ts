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
import { FriendshipData } from '../../../../../types/responseData/FriendshipData';

const friendRequestRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  try {
    switch (req.method) {
      case 'POST':
        const { username }: { username?: string } = req.query;
        const { data: sentData, res: sentRes } =
          await fetchServerAPI<FriendshipData>(
            `friends/requests?username=${username as string}`,
            'POST',
            undefined,
            undefined,
            accessToken
          );

        return setRes<FriendshipData>(res, sentRes.status, sentData);
      case 'DELETE':
        const { friend_username }: { friend_username?: string } = req.query;
        const { data: deletedData, res: deletedRes } = await fetchServerAPI(
          `friends/requests?friend_username=${friend_username as string}`,
          'DELETE',
          undefined,
          undefined,
          accessToken
        );

        return setRes<DefaultData>(res, deletedRes.status, deletedData);
      default:
        enforceMethod(res, req.method as Method, 'POST', {});
    }
  } catch (err) {
    return setRes<DefaultData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {});
  }
};

export default withAuthRoute(friendRequestRoute);

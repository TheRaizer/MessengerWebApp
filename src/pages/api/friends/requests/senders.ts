import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRoute } from '../../../../helpers/api/session';
import {
  enforceMethod,
  fetchServerAPI,
  setRes,
} from '../../../../helpers/api/api';
import { UserData } from '../../../../../types/redux/states/user.type';
import { Method } from '../../../../../types/helpers/api/request.type';
import { CursorPaginationResponse } from '../../../../../types/helpers/pagination.type';
import { PublicUserModel } from '../../../../../types/Models/User.type';
import { StatusCodes } from 'http-status-codes';

const friendRequestSendersRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const { limit, cursor }: { limit?: string; cursor?: string } = req.query;
  enforceMethod<UserData>(res, req.method as Method, 'GET', {});
  const cursorParam = cursor ? `cursor=${cursor}` : '';

  try {
    const { data, res: serverRes } = await fetchServerAPI<
      CursorPaginationResponse<PublicUserModel>
    >(
      `friends/requests/senders?limit=${limit || ''}&${cursorParam}`,
      'GET',
      undefined,
      undefined,
      accessToken
    );

    return setRes<CursorPaginationResponse<PublicUserModel>>(
      res,
      serverRes.status,
      data
    );
  } catch (err) {
    return setRes<CursorPaginationResponse<PublicUserModel>>(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      {
        cursor: {},
        results: [],
        detail: 'internal server error',
      }
    );
  }
};

export default withAuthRoute(friendRequestSendersRoute);

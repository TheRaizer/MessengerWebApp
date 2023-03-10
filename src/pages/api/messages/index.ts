import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRoute } from '../../../helpers/api/session';
import {
  enforceMethod,
  fetchServerAPI,
  setRes,
} from '../../../helpers/api/api';
import { Method } from '../../../../types/helpers/api/request.type';
import { CursorPaginationResponse } from '../../../../types/helpers/pagination.type';
import { StatusCodes } from 'http-status-codes';
import { MessageModel } from '../../../../types/Models/MessageModel.type';

const messagesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string
) => {
  const {
    friend_username,
    limit,
    cursor,
  }: { friend_username?: string; limit?: string; cursor?: string } = req.query;
  enforceMethod<CursorPaginationResponse<MessageModel>>(
    res,
    req.method as Method,
    'GET',
    { cursor: { next_page: null, prev_page: null }, results: [] }
  );

  if (!friend_username) {
    return setRes<CursorPaginationResponse<MessageModel>>(
      res,
      StatusCodes.BAD_REQUEST,
      {
        cursor: { next_page: null, prev_page: null },
        results: [],
        detail: 'friend username was not provided',
      }
    );
  }

  const cursorParam = cursor ? `&cursor=${cursor}` : '';

  try {
    const { data, res: serverRes } = await fetchServerAPI<
      CursorPaginationResponse<MessageModel>
    >(
      `messages?friend_username=${friend_username}&limit=${
        limit || ''
      }${cursorParam}`,
      'GET',
      undefined,
      undefined,
      accessToken
    );

    return setRes<CursorPaginationResponse<MessageModel>>(
      res,
      serverRes.status,
      data
    );
  } catch (err) {
    return setRes<CursorPaginationResponse<MessageModel>>(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      {
        cursor: { next_page: null, prev_page: null },
        results: [],
        detail: 'internal server error',
      }
    );
  }
};

export default withAuthRoute(messagesRoute);

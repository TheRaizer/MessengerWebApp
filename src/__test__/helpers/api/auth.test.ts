import { serialize } from 'cookie';
import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { AuthRequest } from '../../../../types/pages/api/auth/auth.type';
import { UserStateProps } from '../../../../types/redux/states/user.type';
import { authenticate } from '../../../helpers/api/auth';
import { CookieKeys } from '../../../helpers/cookie';
import { rest, server } from '../../test-helpers/server';
import * as api from '../../../helpers/api/api';

const userData: UserStateProps = {
  user_id: 7,
  username: 'testuser',
  email: 'test@example.com',
};
const setResMock = jest.fn();

jest.spyOn(api, 'setRes').mockImplementation((res, statusCode, data) => {
  setResMock(res, statusCode, data);
});
jest.mock('jwt-decode', () => () => userData);

describe('authenticate', () => {
  const route = 'login';
  const req: AuthRequest = {
    body: {
      grant_type: 'password',
      email: 'test@example.com',
      password: 'password123',
    },
  } as unknown as AuthRequest;
  const setHeader = jest.fn();
  const res: Partial<NextApiResponse> = {
    setHeader,
  };

  it('should authenticate a user and set access tokens in cookies', async () => {
    await authenticate(route, req, res as NextApiResponse);

    expect(setResMock).toHaveBeenCalledWith(res, StatusCodes.CREATED, {
      user: userData,
    });

    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', [
      serialize(CookieKeys.ACCESS_TOKEN, 'test-access-token', {
        httpOnly: true,
        secure: false, // Set to `false` because we're not in a production environment
        path: '/',
        sameSite: 'strict',
      }),
      serialize(CookieKeys.SOCKETIO_ACCESS_TOKEN, 'test-socket-token', {
        secure: false, // Set to `false` because we're not in a production environment
        path: '/',
        sameSite: 'strict',
      }),
    ]);
  });

  it('should return an error if authentication fails', async () => {
    const expectedDetail = 'Invalid credentials';
    server.use(
      rest.post('/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(StatusCodes.UNAUTHORIZED),
          ctx.json({ detail: expectedDetail })
        );
      })
    );
    await authenticate(route, req, res as NextApiResponse);

    expect(setResMock).toHaveBeenCalledWith(res, StatusCodes.UNAUTHORIZED, {
      detail: expectedDetail,
    });
  });

  it('should return an error if socketio authentication fails', async () => {
    const expectedDetail = 'Failed to retrieve socketio token';
    server.use(
      rest.post('/auth/socket-ticket', (req, res, ctx) => {
        return res(
          ctx.status(StatusCodes.UNAUTHORIZED),
          ctx.json({ detail: expectedDetail })
        );
      })
    );
    await authenticate(route, req, res as NextApiResponse);

    expect(setResMock).toHaveBeenCalledWith(res, StatusCodes.UNAUTHORIZED, {
      detail: expectedDetail,
    });
  });
});

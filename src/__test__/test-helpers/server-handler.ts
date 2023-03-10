// server-handlers.js
// this is put into here so I can share these same handlers between my tests
import { rest } from 'msw';
import { ServerAuthBody } from '../../../types/Models/ServerSignInBody.type';
import { StatusCodes } from 'http-status-codes';
import { AuthRequirements } from '../../../types/pages/api/auth/auth.type';
import { UserData } from '../../../types/redux/states/user.type';

const handlers = [
  rest.post('/auth/login', async (req, res, ctx) => {
    const bodyText = await req.text();
    const formData = new URLSearchParams(decodeURIComponent(bodyText));
    const {
      grant_type,
      username: email,
      password,
    } = Object.fromEntries(formData.entries()) as ServerAuthBody;

    if (!grant_type || !email || !password) {
      return res(
        ctx.status(StatusCodes.BAD_REQUEST),
        ctx.json({
          detail: 'invalid body',
        })
      );
    }

    return res(
      ctx.status(StatusCodes.CREATED),
      ctx.json({ access_token: 'test-access-token', token_type: 'auth' })
    );
  }),
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const { email, password } =
      (await req.json()) as unknown as AuthRequirements;

    if (!email || !password) {
      return res(
        ctx.status(StatusCodes.BAD_REQUEST),
        ctx.json({
          detail: 'invalid body',
        })
      );
    }

    const userData: UserData = {
      user: {
        user_id: 7,
        username: 'test_username',
        email: 'test@email.com',
      },
    };
    return res(ctx.status(StatusCodes.CREATED), ctx.json(userData));
  }),
  rest.post('/auth/socket-ticket', async (req, res, ctx) => {
    const bodyText = await req.text();
    const formData = new URLSearchParams(decodeURIComponent(bodyText));
    const {
      grant_type,
      username: email,
      password,
    } = Object.fromEntries(formData.entries()) as ServerAuthBody;

    if (!grant_type || !email || !password) {
      return res(
        ctx.status(StatusCodes.BAD_REQUEST),
        ctx.json({
          detail: 'invalid body',
        })
      );
    }

    return res(
      ctx.status(StatusCodes.CREATED),
      ctx.json({ access_token: 'test-socket-token', token_type: 'socket' })
    );
  }),
];

export { handlers };

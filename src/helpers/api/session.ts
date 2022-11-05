import { IncomingHttpHeaders } from 'http';
import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  UnknownObject,
  ContextHandler,
  SsrWithProps,
} from '../../../types/helpers/api/session.type';

const sessionOptions: IronSessionOptions = {
  password: process.env.IRON_SESSION_ENCRYPT_KEY as string,
  cookieName: 'LCel-server',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

/**
 * Retrieves auth token from HTTP headers.
 */
const getAuthToken = (headers: IncomingHttpHeaders): string | null => {
  const parsed = headers.authorization?.replace('Bearer ', '') ?? null;
  return parsed;
};

/**
 * Wrapper for the standard NextApiHandler, that provides the request with iron sessions, encrypted session data.
 * @param handler the standard NextApiHandler (api route function that recieves a NextApiResponse and NextApiRequest).
 * @returns the given handler with the additional iron session data.
 */
export const withSessionRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string | null
  ) => void | Promise<void>
): NextApiHandler => {
  return withIronSessionApiRoute(async (req, res) => {
    try {
      return await handler(req, res, getAuthToken(req.headers));
    } catch {
      res.status(500).send({ detail: 'API Error' });
    }
  }, sessionOptions);
};

const withSessionSsr = <T extends UnknownObject>(
  handler: ContextHandler<T>
): SsrWithProps<T> => {
  return withIronSessionSsr(handler, sessionOptions);
};

/**
 * Function for nextjs SSR props which only allow users that
 * have authentication, a verified email, and a user account.
 * */
export function withAuthentication<T extends UnknownObject = UnknownObject>(
  handler: ContextHandler<T>
): SsrWithProps<T> {
  return withSessionSsr((context) => {
    // if (
    //   context.req.session.user?.userData &&
    //   context.req.session.user.emailVerified
    // ) {
    //   return handler(context);
    // }

    const redirectHome = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
    return redirectHome;
  });
}

// This is where we specify the typings of req.session.*
// declare module 'iron-session' {
//   interface IronSessionData {
//     user?: User;
//   }
// }

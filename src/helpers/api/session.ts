import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  UnknownObject,
  ContextHandler,
  SsrWithProps,
} from '../../../types/helpers/api/session.type';
import { isValidAccessToken } from './aws';
import { CookieKeys, deleteHttpOnlyCookie } from '../cookie';

/**
 * Wrapper for the standard NextApiHandler, that provides the request with an authentication token
 * @param handler the standard NextApiHandler (api route function that recieves a NextApiResponse and NextApiRequest).
 */
export const withAuthRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string
  ) => void | Promise<void>
): NextApiHandler => {
  return async (req, res) => {
    try {
      const authToken = req.cookies[CookieKeys.ACCESS_TOKEN];

      if (!authToken) {
        return res.status(401).send({ detail: 'No access token was given' });
      }
      return await handler(req, res, authToken);
    } catch {
      return res.status(500).send({ detail: 'API Error' });
    }
  };
};

/**
 * Function for nextjs SSR props which only allow users that
 * have authentication, a verified email, and a user account.
 * */
export function withAuthentication<T extends UnknownObject = UnknownObject>(
  handler: ContextHandler<T>
): SsrWithProps<T> {
  return async (context) => {
    const redirectHome = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

    try {
      const accessToken = context.req.cookies[CookieKeys.ACCESS_TOKEN];

      if (accessToken) {
        const hasAuthentication = await isValidAccessToken(accessToken);

        if (hasAuthentication) {
          return handler(context);
        }

        deleteHttpOnlyCookie(CookieKeys.ACCESS_TOKEN, context.res);
      }
    } catch (err) {
      return redirectHome;
    }

    return redirectHome;
  };
}

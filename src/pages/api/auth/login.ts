import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { LoginRequest } from '../../../../types/pages/api/auth/login.type';
import { AuthTokenData } from '../../../../types/responseData/authTokenData.type';
import { fetchServerAPI, setRes } from '../../../helpers/api/api';
import { withSessionRoute } from '../../../helpers/api/session';

const loginRoute = async (req: LoginRequest, res: NextApiResponse) => {
  const signInBody = {
    grant_type: 'password',
    username: req.body.email,
    password: req.body.password,
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const {
    data: { access_token, token_type },
  } = await fetchServerAPI<AuthTokenData>('/auth/sign-in', 'POST', signInBody, {
    headers,
  });

  console.log('AUTH TOKEN', access_token);

  req.session.authToken = access_token;
  await req.session.save();

  return setRes<AuthTokenData>(res, StatusCodes.CREATED, {
    access_token,
    token_type,
  });
};

export default withSessionRoute(loginRoute);

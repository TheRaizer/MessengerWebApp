import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { SignUpRequest } from '../../../../types/pages/api/auth/sign-up.type';
import { AuthTokenData } from '../../../../types/responseData/authTokenData.type';
import { fetchServerAPI, setRes } from '../../../helpers/api/api';
import { withSessionRoute } from '../../../helpers/api/session';

const signUpRoute = async (req: SignUpRequest, res: NextApiResponse) => {
  const signUpBody = {
    grant_type: 'password',
    username: req.body.email,
    password: req.body.password,
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const {
    data: { access_token, token_type },
  } = await fetchServerAPI<AuthTokenData>(
    `/auth/sign-in?username=${req.body.username}`,
    'POST',
    signUpBody,
    {
      headers,
    }
  );

  console.log('AUTH TOKEN', access_token);

  req.session.authToken = access_token;
  await req.session.save();

  return setRes<AuthTokenData>(res, StatusCodes.CREATED, {
    access_token,
    token_type,
  });
};

export default withSessionRoute(signUpRoute);

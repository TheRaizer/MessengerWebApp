import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { LoginRequest } from '../../../../types/pages/api/auth/login.type';
import { AccessTokenData } from '../../../../types/responseData/AccessTokenData.type';
import { fetchAuthAPI, setRes } from '../../../helpers/api/api';
import { withSessionRoute } from '../../../helpers/api/session';

const loginRoute = async (req: LoginRequest, res: NextApiResponse) => {
  const signInBody = new URLSearchParams({
    grant_type: 'password',
    username: req.body.email,
    password: req.body.password,
  });

  const {
    data: { access_token, token_type, detail },
    res: authRes,
  } = await fetchAuthAPI<AccessTokenData>('auth/sign-in', 'POST', signInBody);

  if (authRes.status !== StatusCodes.CREATED) {
    console.error(detail);
    return setRes<AccessTokenData>(res, authRes.status, {
      access_token: '',
      token_type: '',
      detail: detail,
    });
  }

  console.log('AUTH TOKEN', access_token);

  req.session.accessToken = access_token;
  await req.session.save();

  return setRes<AccessTokenData>(res, StatusCodes.CREATED, {
    access_token,
    token_type,
  });
};

export default withSessionRoute(loginRoute);

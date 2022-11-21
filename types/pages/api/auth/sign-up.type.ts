import { NextApiRequest } from 'next';
import { AuthProps } from './auth.type';

type Body = AuthProps & {
  username: string;
};

export interface SignUpRequest extends NextApiRequest {
  body: Body;
}

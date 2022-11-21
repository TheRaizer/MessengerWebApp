import { NextApiRequest } from 'next';
import { AuthRequirements } from './auth.type';

type Body = AuthRequirements & {
  username: string;
};

export interface SignUpRequest extends NextApiRequest {
  body: Body;
}

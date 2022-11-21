import { NextApiRequest } from 'next';
import { AuthProps } from './auth.type';

export interface LoginRequest extends NextApiRequest {
  body: AuthProps;
}

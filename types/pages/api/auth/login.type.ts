import { NextApiRequest } from 'next';
import { AuthRequirements } from './auth.type';

export interface LoginRequest extends NextApiRequest {
  body: AuthRequirements;
}

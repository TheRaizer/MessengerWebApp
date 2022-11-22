import { NextApiRequest } from 'next';

export type AuthRequirements = {
  email: string;
  password: string;
};

export interface AuthRequest extends NextApiRequest {
  body: AuthRequirements;
}

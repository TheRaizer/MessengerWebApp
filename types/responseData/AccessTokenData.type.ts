import { DefaultData } from './DefaultData';

export interface AccessTokenData extends DefaultData {
  access_token: string;
  token_type: string;
}

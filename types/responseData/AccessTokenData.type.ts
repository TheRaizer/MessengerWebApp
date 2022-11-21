import { DefaultData } from './DefaultData.type';

export interface AccessTokenData extends DefaultData {
  access_token: string;
  token_type: string;
}

import { ServerResponse } from 'http';

export enum CookieKeys {
  ACCESS_TOKEN = 'access_token',
}

export const deleteHttpOnlyCookie = (name: string, res: ServerResponse) => {
  res.setHeader('Set-Cookie', `${name}=''; Path=/; Max-Age=-1`);
};

/**
 * Helper functions for non-HTTPOnly cookies
 */

import { ServerResponse } from 'http';

export enum CookieKeys {
  ACCESS_TOKEN = 'access_token',
}

export const getCookie = (key: string): string => {
  const cookies = Object.fromEntries(
    document.cookie.split(/; /).map((c) => {
      const [key, v] = c.split('=', 2);
      return [key, decodeURIComponent(v)];
    })
  );
  return cookies[key] || '';
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const deleteCookieServerside = (name: string, res: ServerResponse) => {
  res.setHeader('Set-Cookie', `${name}=''; Path=/; Max-Age=-1`);
};

export const deleteAllCookies = () => {
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { FetchReturn } from '../../../types/helpers/api/fetchAPI.type';
import { Method } from '../../../types/helpers/api/request.type';
import { DefaultData } from '../../../types/responseData/DefaultData';

/**
 * Fetch function for the front end to access the api correctly.
 * @param url - the url for the api
 * @param method - the type of method to assign to the request
 * @param body - the body of the request
 * @param options - other request options
 * @returns the data and response returned from the request
 */
export const fetchAPI = async <T>(
  url: string,
  method: Method,
  body?: unknown,
  options?: RequestInit
): FetchReturn<T> => {
  const headers = {
    ...options?.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const res = await fetch(`${url}`, {
      ...options,
      body: JSON.stringify(body),
      method: method,
      headers,
    });

    const data: T = (await res.json()) as T;
    return { data, res };
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const fetchNextAPI = async <T extends DefaultData>(
  url: string,
  method: Method,
  body?: unknown,
  options?: RequestInit
): FetchReturn<T> => {
  return await fetchAPI(`/api/${url}`, method, body, options);
};

export const fetchServerAPI = async <T extends DefaultData>(
  url: string,
  method: Method,
  body?: unknown,
  options?: RequestInit,
  token?: string
): FetchReturn<T> => {
  const tokenString = token?.toString() || '';

  const headers = {
    ...options?.headers,
    Authorization: 'Bearer ' + tokenString,
  };

  return await fetchAPI(
    `${process.env.SERVER_API_URL as string}/${url}`,
    method,
    body,
    {
      ...options,
      headers: headers,
    }
  );
};

export const fetchAuthAPI = async <T extends DefaultData>(
  url: string,
  method: Method,
  body?: BodyInit,
  options?: RequestInit
): FetchReturn<T> => {
  const headers = {
    ...options?.headers,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const res = await fetch(
      `${process.env.SERVER_API_URL as string}/auth/${url}`,
      {
        ...options,
        body: body,
        method: method,
        headers,
      }
    );

    const data: T = (await res.json()) as T;
    return { data, res };
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const setRes = <T extends DefaultData>(
  res: NextApiResponse,
  statusCode: StatusCodes,
  data: T
) => {
  return res.status(statusCode).json(data);
};

export const enforceMethod = <T extends DefaultData>(
  res: NextApiResponse,
  method: Method,
  expectedMethod: Method,
  data: T
) => {
  if (method !== expectedMethod) {
    setRes<T>(res, StatusCodes.BAD_REQUEST, {
      ...data,
      detail: 'invalid method',
    });
  }
};

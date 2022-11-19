import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { FetchReturn } from '../../../types/helpers/api/fetchAPI.type';
import { Method } from '../../../types/helpers/api/request.type';

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
    throw new Error('request failed: ' + (err as { message: string }).message);
  }
};

export const fetchNextAPI = async <T>(
  url: string,
  method: Method,
  body?: unknown,
  options?: RequestInit
): FetchReturn<T> => {
  return await fetchAPI(`/api/${url}`, method, body, options);
};

export const fetchServerAPI = async <T>(
  url: string,
  method: Method,
  body?: unknown,
  options?: RequestInit
): FetchReturn<T> => {
  return await fetchAPI(
    `${process.env.SERVER_API_URL as string}/${url}`,
    method,
    body,
    options
  );
};

export const setRes = <T>(
  res: NextApiResponse,
  statusCode: StatusCodes,
  data: T
) => {
  return res.status(statusCode).json(data);
};

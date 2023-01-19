import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';

export type ContextHandler<P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export type UnknownObject = { [key: string]: unknown };

export type SsrWithProps<P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => Promise<GetServerSidePropsResult<P>>;

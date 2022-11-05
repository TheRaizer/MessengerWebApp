import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';
// import type { User as AuthUser } from 'firebase/auth';
// import { Mutable } from '../../Mutable.type';

// export type User = {
// }

// declare module 'iron-session' {
//   interface IronSessionData {
//     user?: User;
//   }
// }

export type ContextHandler<P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export type UnknownObject = { [key: string]: unknown };

export type SsrWithProps<P> = (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => Promise<GetServerSidePropsResult<P>>;

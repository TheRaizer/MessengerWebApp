import { SWRInfiniteConfiguration } from 'swr/infinite';

export const RESTRICT_FIRST_PAGE_REVALIDATION: SWRInfiniteConfiguration = {
  revalidateFirstPage: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

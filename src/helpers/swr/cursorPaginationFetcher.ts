import { CursorPaginationResponse } from '../../../types/helpers/pagination.type';
import { fetchNextAPI } from '../api/api';

export const cursorPaginationFetcher =
  <T>() =>
  (url: string) =>
    fetchNextAPI<CursorPaginationResponse<T>>(url, 'GET').then(
      ({ data }) => data
    );

export const cursorPaginationHasMoreData =
  <T>() =>
  (data?: CursorPaginationResponse<T>[]): boolean => {
    return (
      data !== undefined && data[data.length - 1]?.cursor.next_page !== null
    );
  };

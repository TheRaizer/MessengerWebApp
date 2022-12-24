import { CursorPaginationResponse } from '../../types/helpers/pagination.type';

export const nextCursorSWRGetKey = (url: string, limit: number) => {
  const getKey = (_: number, previousPageData?: CursorPaginationResponse) => {
    // reached the end
    if (previousPageData && !previousPageData.cursor.next_page) return null;

    const next_page_cursor: string | undefined =
      previousPageData?.cursor.next_page;

    const cursor = next_page_cursor ? `cursor=${next_page_cursor}` : '';

    // add the cursor to the API endpoint
    return `${url}?${cursor}&limit=${limit}`;
  };

  return getKey;
};

import { CursorPaginationResponse } from '../../types/helpers/pagination.type';

export const nextCursorSWRGetKey = (
  url: string,
  limit: number,
  parameters?: string
) => {
  const params = parameters ? parameters + '&' : '';

  const getKey = (_: number, previousPageData?: CursorPaginationResponse) => {
    // reached the end
    if (previousPageData && !previousPageData.cursor.next_page) return null;

    const next_page_cursor: string | null =
      previousPageData?.cursor.next_page || null;

    const cursor = next_page_cursor ? `&cursor=${next_page_cursor}` : '';

    // add the cursor to the API endpoint
    return `${url}?${params}limit=${limit}${cursor}`;
  };

  return getKey;
};

import { DefaultData } from '../responseData/DefaultData';

export interface CursorPaginationResponse<T = unknown> extends DefaultData {
  cursor: {
    next_page: string | null;
    prev_page: string | null;
  };
  results: T[];
}

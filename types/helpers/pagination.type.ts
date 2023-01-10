import { DefaultData } from '../responseData/DefaultData';

export interface CursorPaginationResponse<T = unknown> extends DefaultData {
  cursor: {
    next_page?: string;
    prev_page?: string;
  };
  results: T[];
}

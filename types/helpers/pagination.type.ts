import { DefaultData } from '../responseData/DefaultData.type';

export interface CursorPaginationResponse<T = unknown> extends DefaultData {
  cursor: {
    next_page?: string;
    prev_page?: string;
  };
  results: T[];
}

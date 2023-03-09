import { CursorPaginationResponse } from '../../../../types/helpers/pagination.type';
import { cursorPaginationHasMoreData } from '../../../helpers/swr/cursorPaginationFetcher';

describe('cursorPaginationHasMoreData', () => {
  it('should return false if data is undefined', () => {
    const hasMoreData = cursorPaginationHasMoreData<string>()(undefined);
    expect(hasMoreData).toBe(false);
  });

  it('should return false if the last item in the data array has no next page', () => {
    const data: CursorPaginationResponse<string>[] = [
      {
        cursor: {
          next_page: undefined,
        },
        results: ['foo', 'bar'],
      },
    ];
    const hasMoreData = cursorPaginationHasMoreData<string>()(data);
    expect(hasMoreData).toBe(false);
  });

  it('should return true if the last item in the data array has a next page', () => {
    const data: CursorPaginationResponse<string>[] = [
      {
        cursor: {
          next_page: 'http://example.com/api?page=2',
        },
        results: ['foo', 'bar'],
      },
    ];
    const hasMoreData = cursorPaginationHasMoreData<string>()(data);
    expect(hasMoreData).toBe(true);
  });

  it('should return true if there are multiple items in the data array and the last item has a next page', () => {
    const data: CursorPaginationResponse<string>[] = [
      {
        cursor: {
          next_page: 'http://example.com/api?page=2',
        },
        results: ['foo', 'bar'],
      },
      {
        cursor: {
          next_page: 'http://example.com/api?page=3',
        },
        results: ['baz', 'qux'],
      },
    ];
    const hasMoreData = cursorPaginationHasMoreData<string>()(data);
    expect(hasMoreData).toBe(true);
  });

  it('should return false if there are multiple items in the data array and the last item has no next page', () => {
    const data: CursorPaginationResponse<string>[] = [
      {
        cursor: {
          next_page: 'http://example.com/api?page=2',
        },
        results: ['foo', 'bar'],
      },
      {
        cursor: {
          next_page: undefined,
        },
        results: ['baz', 'qux'],
      },
    ];
    const hasMoreData = cursorPaginationHasMoreData<string>()(data);
    expect(hasMoreData).toBe(false);
  });
});

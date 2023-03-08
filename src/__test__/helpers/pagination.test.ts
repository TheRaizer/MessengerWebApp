import { CursorPaginationResponse } from '../../../types/helpers/pagination.type';
import { nextCursorSWRGetKey } from '../../helpers/pagination';

describe('nextCursorSWRGetKey', () => {
  const url = 'https://example.com/api/items';
  const limit = 10;

  it('should return a function', () => {
    const getKey = nextCursorSWRGetKey(url, limit);
    expect(typeof getKey).toBe('function');
  });

  it('should return a key with the correct URL and parameters', () => {
    const getKey = nextCursorSWRGetKey(url, limit);
    const key = getKey(0);
    expect(key).toBe(`${url}?limit=${limit}`);
  });

  it('should return a key with a cursor when previous page data is provided', () => {
    const getKey = nextCursorSWRGetKey(url, limit);
    const previousPageData: CursorPaginationResponse = {
      cursor: {
        next_page: 'abc123',
      },
      results: [],
    };
    const key = getKey(1, previousPageData);
    expect(key).toBe(`${url}?limit=${limit}&cursor=abc123`);
  });

  it('should return null when there is no next page cursor', () => {
    const getKey = nextCursorSWRGetKey(url, limit);
    const previousPageData: CursorPaginationResponse = {
      cursor: {
        next_page: undefined,
      },
      results: [],
    };
    const key = getKey(1, previousPageData);
    expect(key).toBeNull();
  });

  it('should include additional parameters when they are provided', () => {
    const getKey = nextCursorSWRGetKey(url, limit, 'category=books');
    const key = getKey(0);
    expect(key).toBe(`${url}?category=books&limit=${limit}`);
  });

  it('should append additional parameters when they are provided and there is a cursor', () => {
    const getKey = nextCursorSWRGetKey(url, limit, 'category=books');
    const previousPageData: CursorPaginationResponse = {
      cursor: {
        next_page: 'abc123',
      },
      results: [],
    };
    const key = getKey(1, previousPageData);
    expect(key).toBe(`${url}?category=books&limit=${limit}&cursor=abc123`);
  });
});

import { CursorPaginationResponse } from '../../../../types/helpers/pagination.type';
import { fetchNextAPI } from '../../../helpers/api/api';
import { cursorPaginationFetcher } from '../../../helpers/swr/cursorPaginationFetcher';

jest.mock('../../../helpers/api/api');

describe('cursorPaginationFetcher', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call fetchNextAPI with the correct parameters', async () => {
    const mockResponse: CursorPaginationResponse<string> = {
      cursor: {
        next_page: 'http://example.com/api?page=2',
      },
      results: ['foo', 'bar'],
    };

    (fetchNextAPI as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const fetcher = cursorPaginationFetcher<string>();
    const result = await fetcher('http://example.com/api');

    expect(fetchNextAPI).toHaveBeenCalledWith('http://example.com/api', 'GET');
    expect(result).toEqual(mockResponse);
  });
});

import { fetchAPI } from '../../../helpers/api/api';

describe('fetchAPI', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
  });

  it('should return data and response', async () => {
    const responseData = { message: 'Hello World!' };
    fetchMock.mockResponseOnce(JSON.stringify(responseData));

    const url = 'https://example.com/api';
    const method = 'POST';
    const body = { foo: 'bar' };
    const options = { headers: { 'X-Custom-Header': 'value' } };

    const result = await fetchAPI(url, method, body, options);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      body: JSON.stringify(body),
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...options.headers,
      },
    });

    expect(result).toEqual({
      data: responseData,
      res: expect.objectContaining({ ok: true }),
    });
  });

  it('should throw an error when fetch fails', async () => {
    const error = new Error('Fetch error');
    fetchMock.mockReject(error);

    await expect(fetchAPI('https://example.com', 'GET')).rejects.toThrow(error);
  });
});

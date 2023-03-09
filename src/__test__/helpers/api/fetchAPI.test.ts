import { rest } from 'msw';
import { fetchAPI } from '../../../helpers/api/api';
import { server } from '../../test-helpers/server';

describe('fetchAPI', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should return data and response', async () => {
    const url = 'https://example.com/api';
    const method = 'POST';
    const body = { foo: 'bar' };
    const options = { headers: { 'X-Custom-Header': 'value' } };

    server.use(
      rest.post('https://example.com/api', (req, res, ctx) => {
        const responseData = { message: 'Hello World!' };
        return res(ctx.json(responseData));
      })
    );

    const result = await fetchAPI(url, method, body, options);

    expect(result).toEqual({
      data: { message: 'Hello World!' },
      res: expect.objectContaining({ ok: true }) as unknown,
    });
  });

  it('should throw an error when fetch fails', async () => {
    server.use(
      rest.get('https://example.com', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    await expect(fetchAPI('https://example.com', 'GET')).rejects.toThrow();
  });
});

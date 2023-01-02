import { Directive, Options } from '../../types/helpers/generateCSP.type';

export const generateCSP = () => {
  const policy: Partial<Record<Directive, string[]>> = {};

  // adder function for our policy object
  const add = (directive: Directive, value: string, options: Options = {}) => {
    if (options.devOnly && process.env.NODE_ENV !== 'development') return;
    const curr = policy[directive];
    policy[directive] = curr ? [...curr, value] : [value];
  };

  add('default-src', `'none'`);

  add('prefetch-src', `'self'`);

  add('img-src', `'self'`);

  add('font-src', `'self'`);

  add('script-src-elem', `'self'`);

  add('script-src', `'unsafe-eval'`, { devOnly: true });

  add(
    'connect-src',
    `'self' ${process.env.SOCKET_URL as string} ${
      process.env.SERVER_API_URL as string
    };`
  );

  add('style-src', `'self' 'unsafe-inline'`);

  // return the object in a formatted value
  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join('; ');
};

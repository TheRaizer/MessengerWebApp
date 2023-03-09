import '@testing-library/jest-dom';
import 'jest-styled-components';
import fetch from 'isomorphic-fetch';
import { server } from './src/__test__/test-helpers/server';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());
global.fetch = fetch;

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

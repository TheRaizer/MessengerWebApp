import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ViewportStates } from '../../../types/redux/states/appConfig.type';
import { store } from '../../redux/store';
import { ToastContainer } from 'react-toastify';

beforeEach(() => {
  store.dispatch({ type: 'clear' });
});

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <ThemeProvider theme={{ viewportState: ViewportStates.DESKTOP }}>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });
export * from '@testing-library/react';
export { customRender as render };

/***
 * This App component is the top-level component which will be common across all the different pages.
 * You can use this App component to keep state when navigating between pages, for example.
 *
 * Any CSS files imported into this file, will be used globally
 * ***/

import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import GlobalStyle from '../styles/globalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Modal from '../components/Modals/Modal';
import { ToastContainer } from 'react-toastify';
import { AppLoading } from '../components/common/AppLoading';
import { AppLifecycle } from '../components/Containers/AppLifecycles';
import { NAV_BAR_HEIGHT } from '../constants/dimensions';
import 'styled-components';
import Head from 'next/head';
import { ViewportStates } from '../../types/redux/states/appConfig.type';
import { generateCSP } from '../helpers/generateCSP';
import { LazyMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { selectAppConfig } from '../redux/slices/appConfigSlice';
import { SkeletonTheme } from 'react-loading-skeleton';
import { NavBar } from '../components/NavBar/NavBar';

declare module 'styled-components' {
  export interface DefaultTheme {
    viewportState: ViewportStates;
  }
}

const StyledPageContainer = styled.div`
  height: calc(100vh - ${NAV_BAR_HEIGHT});
`;

const PageComponent = ({ Component, pageProps }: AppProps): ReactElement => {
  const { viewportState } = useAppSelector(selectAppConfig);

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="en" />
        <meta httpEquiv="Content-Security-Policy" content={generateCSP()} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="website, gaming, video games, social, online, free-to-play"
        />
        <meta name="author" content="Aidan Fu" />
        <meta name="publisher" content="Aidan Fu" />
        <meta name="copyright" content="Aidan Fu" />
        <meta name="page-topic" content="Media" />
        <meta name="page-type" content="Games" />
        <meta name="audience" content="Everyone" />
        <meta name="robots" content="index, follow" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={{ viewportState }}>
        <NavBar />
        <StyledPageContainer>
          <Component {...pageProps} />
        </StyledPageContainer>
        <AppLifecycle />
        <Modal />
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
        <AppLoading />
      </ThemeProvider>
    </>
  );
};

const loadFeatures = () =>
  import('../helpers/framer-features').then((res) => res.default);

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Provider store={store}>
      <LazyMotion features={loadFeatures} strict>
        <SkeletonTheme baseColor="#b7c4cf" highlightColor="#a1aeb9">
          <PageComponent
            Component={Component}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            pageProps={pageProps}
            router={router}
          />
        </SkeletonTheme>
      </LazyMotion>
    </Provider>
  );
};

export default App;

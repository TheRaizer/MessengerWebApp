import { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CenteredCol } from '../components/common/Col';
import { Windows } from '../components/Windows/WindowHandler';
import { withAuthentication } from '../helpers/api/session';
import { IconContainer } from '../components/DesktopIcons/IconContainer';
import { SocketListeners } from '../components/Containers/SocketListeners';
import { SocketProvider } from '../components/Providers/SocketProvider';

export const getServerSideProps = withAuthentication(() => {
  return {
    props: {},
  };
});

const Styled = {
  HeaderContainer: styled(CenteredCol)`
    text-align: center;
  `,
  Header: styled.h1`
    font-size: 96px;
    font-weight: normal;
  `,
  BackgroundContainer: styled.div`
    background-color: var(--primary-color);
    height: 100%;
    width: 100%;
  `,
};

const Messenger = (): ReactElement => {
  return (
    <>
      <Head>
        <title>R-OS Messenger</title>
        <meta
          name="description"
          content="A retro messenger formatted like an OS"
        />
      </Head>
      <SocketProvider>
        <SocketListeners />
        <Styled.BackgroundContainer>
          <Windows />
          <IconContainer />
        </Styled.BackgroundContainer>
      </SocketProvider>
    </>
  );
};

export default Messenger;

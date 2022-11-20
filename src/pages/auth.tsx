import { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CenteredCol } from '../components/common/Col';
import { Auth } from '../components/Auth/Auth';

const Styled = {
  HeaderContainer: styled(CenteredCol)`
    text-align: center;
  `,
  Header: styled.h1`
    font-size: 96px;
  `,
  BackgroundContainer: styled.div`
    background-color: var(--new-primary-color);
    height: 100%;
    width: 100%;
  `,
};

const Home = (): ReactElement => {
  return (
    <>
      <Head>
        <title>R-OS Messenger</title>
        <meta
          name="description"
          content="A retro messenger formatted like an OS, login now!"
        />
      </Head>
      <Styled.BackgroundContainer>
        <Auth />
      </Styled.BackgroundContainer>
    </>
  );
};

export default Home;

import { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CenteredCol } from '../components/common/Col';

const Styled = {
  HeaderContainer: styled(CenteredCol)`
    text-align: center;
  `,
  Header: styled.h1`
    font-size: 96px;
    font-weight: normal;
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
        <title>Morpt</title>
        <meta
          name="description"
          content="Morpt, AI generates a sentence, you guess the topic."
        />
      </Head>
      <Styled.BackgroundContainer>
        <Styled.HeaderContainer gap={20}>
          <Styled.Header>Boiler plate</Styled.Header>
        </Styled.HeaderContainer>
      </Styled.BackgroundContainer>
    </>
  );
};

export default Home;

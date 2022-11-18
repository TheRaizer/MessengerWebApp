import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CenteredCol } from '../components/common/Col';
import { Windows } from '../components/Windows/WindowHandler';
import { useOpenWindow } from '../hooks/actions/useOpenWindow';
import { WindowType } from '../../types/redux/states/windows.type';
import { MessageWindowProps } from '../../types/components/Windows/MessageWindowProps.type';
import { FriendWindowProps } from '../../types/components/Windows/FriendWindowProps.type';

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
  const messageWindowProps: MessageWindowProps = useMemo(
    () => ({ usernameToMessage: 'some_username', groupChatId: undefined }),
    []
  );
  const friendWindowProps: FriendWindowProps = useMemo(
    () => ({ friendUsername: 'some_friend' }),
    []
  );
  const openMessageWindow = useOpenWindow(WindowType.MESSAGE, {
    [WindowType.MESSAGE]: messageWindowProps,
  });
  const openFriendWindow = useOpenWindow(WindowType.FRIEND, {
    [WindowType.FRIEND]: friendWindowProps,
  });

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
        <Windows />
        <button onClick={openMessageWindow}>Open Message Window</button>
        <button onClick={openFriendWindow}>Open Friend Window</button>
      </Styled.BackgroundContainer>
    </>
  );
};

export default Home;

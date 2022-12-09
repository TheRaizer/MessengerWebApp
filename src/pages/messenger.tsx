import { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CenteredCol } from '../components/common/Col';
import { Windows } from '../components/Windows/WindowHandler';
import { useOpenWindow } from '../hooks/actions/window/useOpenWindow';
import { WindowType } from '../../types/redux/states/windows.type';
import { MessageWindowProps } from '../../types/components/Windows/MessageWindow.type';
import { FriendWindowProps } from '../../types/components/Windows/FriendWindow.type';
import { withAuthentication } from '../helpers/api/session';

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

const Home = (): ReactElement => {
  const messageWindowProps: MessageWindowProps = {
    usernameToMessage: 'some_username',
    groupChatId: undefined,
  };
  const friendWindowProps: FriendWindowProps = {
    friendUsername: 'some_friend',
  };

  const openMessageWindow = useOpenWindow(
    WindowType.MESSAGE,
    messageWindowProps
  );
  const openFriendWindow = useOpenWindow(WindowType.FRIEND, friendWindowProps);

  return (
    <>
      <Head>
        <title>R-OS Messenger</title>
        <meta
          name="description"
          content="A retro messenger formatted like an OS"
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

import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { DesktopIcon } from './DesktopIcon';
import { MessageWindowProps } from '../../../types/components/Windows/MessageWindow.type';
import { FriendWindowProps } from '../../../types/components/Windows/FriendWindow.type';
import { WindowType } from '../../../types/redux/states/windows.type';
import { useOpenWindow } from '../../hooks/actions/window/useOpenWindow';

const Styled = {
  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    position: absolute;
    top: 40%;
    left: 5%;
  `,
};

const FriendsIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/fi').then((mod) => mod.FiUsers)
);

const MessagesIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsEnvelope)
);

export const IconContainer = (): ReactElement => {
  const messageWindowProps: MessageWindowProps = {
    usernameToMessage: 'some_username',
    groupChatId: undefined,
  };
  const friendWindowProps: FriendWindowProps = {
    friendUsername: '',
  };

  const openMessageWindow = useOpenWindow(
    WindowType.MESSAGE,
    messageWindowProps
  );
  const openFriendWindow = useOpenWindow(WindowType.FRIEND, friendWindowProps);

  return (
    <Styled.IconContainer>
      <DesktopIcon
        onDoubleClick={openFriendWindow}
        Icon={FriendsIcon}
        name="Friends"
      />
      <DesktopIcon
        onDoubleClick={openMessageWindow}
        Icon={MessagesIcon}
        name="Messages"
      />
    </Styled.IconContainer>
  );
};

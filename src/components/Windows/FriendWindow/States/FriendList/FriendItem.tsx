import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { Col } from '../../../../common/Col';
import { FriendStatus } from './FriendStatus';
import { FriendItemProps } from '../../../../../../types/components/Windows/FriendWindow/States/FriendList/FriendItem.type';

const Styled = {
  FriendItemContainer: styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0px 10px;
    gap: 10px;
  `,
  RightContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  `,
  FriendName: styled.p`
    font-size: 1em;
  `,
  FriendInfo: styled(Col)`
    width: 100%;
  `,
};

const UserIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiUserCircle)
);

const EnvelopeIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiEnvelope)
);

export const FriendItem = ({
  friendUsername,
  friendId,
}: FriendItemProps): ReactElement => {
  // use friend id to get friend status from socketio

  return (
    <Styled.FriendItemContainer>
      <UserIcon size={40} />
      <Styled.RightContainer>
        <Styled.FriendInfo>
          <Styled.FriendName>{friendUsername}</Styled.FriendName>
          <FriendStatus friendId={friendId} />
        </Styled.FriendInfo>
        <EnvelopeIcon size={40} />
      </Styled.RightContainer>
    </Styled.FriendItemContainer>
  );
};
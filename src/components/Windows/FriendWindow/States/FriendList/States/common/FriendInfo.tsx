import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { Col } from '../../../../../../common/Col';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { FriendStatus } from './FriendStatus';

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

export const FriendInfo = ({
  friendUsername,
  friendId,
  children
}: Partial<FriendItemProps> & {children: React.ReactNode}): ReactElement => {
  return (
    <Styled.FriendItemContainer>
      <UserIcon size={40} />
      <Styled.RightContainer>
        <Styled.FriendInfo>
          <Styled.FriendName>{friendUsername}</Styled.FriendName>
          {friendId && <FriendStatus friendId={friendId}/>}
        </Styled.FriendInfo>
          {children}
      </Styled.RightContainer>
    </Styled.FriendItemContainer>
  );
};
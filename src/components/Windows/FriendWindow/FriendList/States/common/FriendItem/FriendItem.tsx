import { ReactElement } from 'react';
import { FriendInfo } from '../FriendInfo';
import styled from 'styled-components';
import { MessageButton } from './MessageButton';
import { DetailsButton } from './DetailsButton';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/FriendList/common/FriendItem/FriendItem.type';

const Styled = {
  IconContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  `,
};

export const FriendItem = ({
  friendUsername,
  friendId,
  mutate,
}: FriendItemProps): ReactElement => {
  return (
    <FriendInfo friendUsername={friendUsername} friendId={friendId}>
      <Styled.IconContainer>
        <MessageButton friendId={friendId} friendUsername={friendUsername} />
        <DetailsButton mutate={mutate} friendUsername={friendUsername} />
      </Styled.IconContainer>
    </FriendInfo>
  );
};

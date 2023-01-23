import { ReactElement } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { selectFriendStatuses } from '../../../../../../../redux/slices/friendStatusesSlice';

const Styled = {
  Status: styled.p`
    font-size: 0.8em;
  `,
};

export const FriendStatus = ({
  friendId,
}: {
  friendId: number;
}): ReactElement => {
  const friendStatuses = useAppSelector(selectFriendStatuses);
  return <Styled.Status>{friendStatuses[friendId] || 'offline'}</Styled.Status>;
};

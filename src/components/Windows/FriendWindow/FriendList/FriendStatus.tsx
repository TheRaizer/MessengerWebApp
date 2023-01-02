import { ReactElement } from 'react';
import styled from 'styled-components';

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
  return <Styled.Status></Styled.Status>;
};

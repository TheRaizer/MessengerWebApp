import { ReactElement } from 'react';
import styled from 'styled-components';

const Styled = {
  SearchBarContainer: styled.input`
    width: 60%;
    background-color: var(--primary-color);
    padding: 0px 5px;
    border: 1px solid black;

    &:focus {
      border: 1px solid black;
    }
  `,
};

export const FriendListSearchBar = (): ReactElement => {
  // TODO: use redux state to store search value.
  return <Styled.SearchBarContainer placeholder="Search" />;
};

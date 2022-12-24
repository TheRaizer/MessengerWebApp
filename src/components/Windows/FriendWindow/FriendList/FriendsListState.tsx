import { ReactElement, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  FriendWindowStates,
  FriendsStateProps,
} from '../../../../../types/components/Windows/FriendWindow.type';
import { ChangeStateProp } from '../../../../../types/hooks/useStateMachine.type';
import { Col } from '../../../common/Col';
import useSWRInfinite from 'swr/infinite';
import { nextCursorSWRGetKey } from '../../../../helpers/pagination';
import { fetchNextAPI } from '../../../../helpers/api/api';
import { CursorPaginationResponse } from '../../../../../types/helpers/pagination.type';
import { UserModel } from '../../../../../types/Models/User.type';
import { FriendItem } from './FriendItem';
import { ActiveStatus } from '../../../../../types/components/Windows/FriendList/FriendItem.type';

const Styled = {
  FriendsListContainer: styled(Col)`
    width: 100%;
    gap: 5px;
    overflow-y: auto;
    /* width */
    &::-webkit-scrollbar {
      width: 23px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--primary-color-2);
      border-left: 1px solid black;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-left: 1px solid black;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      background: var(--primary-color);
    }
  `,
};

const fetcher = (url: string) =>
  fetchNextAPI<CursorPaginationResponse<UserModel>>(url, 'GET').then(
    ({ data }) => data
  );

export const FriendsListState = ({
  changeState,
}: ChangeStateProp<FriendWindowStates, FriendsStateProps>): ReactElement => {
  const getKey = nextCursorSWRGetKey('/friend/requests/accepted', 1);
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  console.log(size);
  const friends = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  useEffect(() => {
    // data can be retrieved from cache, but size remains 1.
    // So we set size to the number of possibly cached values.
    if (!friends) return;
    setSize(friends.length).catch((err) => console.error(err));
  }, [setSize, friends]);

  return (
    <Styled.FriendsListContainer as="ul">
      {friends?.map((friend) => (
        <FriendItem
          key={friend.user_id}
          friendUsername={friend.username}
          friendStatus={ActiveStatus.ACTIVE}
        />
      ))}
      <button onClick={() => setSize(size + 1)}>load more</button>
    </Styled.FriendsListContainer>
  );
};

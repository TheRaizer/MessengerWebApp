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
import { useInView } from 'react-intersection-observer';
import { Spinner } from '../../../Loading/Spinner';

const Styled = {
  FriendsListContainer: styled(Col)`
    height: 100%;
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
  SpinnerContainer: styled.div`
    padding-top: 5%;
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
  const [ref, inView] = useInView();

  // we do not need to revalidate this data as it will not change.
  // friend status will update using socketio
  const { data, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const hasMore = data && data[data.length - 1]?.cursor.next_page !== null;
  const friends = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  useEffect(() => {
    if (inView && hasMore && !isValidating) {
      setSize(size + 1).catch((err) => console.error(err));
    }
  }, [setSize, friends, inView, hasMore, isValidating, size]);

  return (
    <Styled.FriendsListContainer as="ul">
      {friends?.map((friend) => (
        <FriendItem
          key={friend.user_id}
          friendUsername={friend.username}
          friendId={friend.user_id}
        />
      ))}
      {hasMore && (
        <Styled.SpinnerContainer ref={ref}>
          <Spinner color="black" size={1.1} />
        </Styled.SpinnerContainer>
      )}
    </Styled.FriendsListContainer>
  );
};

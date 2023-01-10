import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import {
  FriendWindowStates,
  FriendsStateProps,
} from '../../../../../types/components/Windows/FriendWindow.type';
import { ChangeStateProp } from '../../../../../types/hooks/useStateMachine.type';
import { Col } from '../../../common/Col';
import { fetchNextAPI } from '../../../../helpers/api/api';
import { CursorPaginationResponse } from '../../../../../types/helpers/pagination.type';
import { UserModel } from '../../../../../types/Models/User.type';
import { FriendItem } from './FriendItem';
import { Spinner } from '../../../Loading/Spinner';
import { usePaginateInView } from '../../../../hooks/data/usePaginateInView';
import { RESTRICT_REVALIDATION_CONFIG } from '../../../../constants/swrConfig';

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

const hasMoreData = (data?: CursorPaginationResponse<UserModel>[]): boolean => {
  return data !== undefined && data[data.length - 1]?.cursor.next_page !== null;
};

export const FriendsListState = ({
  changeState,
}: ChangeStateProp<FriendWindowStates, FriendsStateProps>): ReactElement => {
  const { data, ref } = usePaginateInView(
    '/friend/requests/accepted',
    fetcher,
    hasMoreData,
    1,
    RESTRICT_REVALIDATION_CONFIG
  );
  const friends = useMemo(
    () => data?.map((data) => data.results).flat(),
    [data]
  );

  return (
    <Styled.FriendsListContainer as="ul">
      {friends?.map((friend) => (
        <FriendItem
          key={friend.user_id}
          friendUsername={friend.username}
          friendId={friend.user_id}
        />
      ))}
      {hasMoreData(data) && (
        <Styled.SpinnerContainer ref={ref}>
          <Spinner color="black" size={1.1} />
        </Styled.SpinnerContainer>
      )}
    </Styled.FriendsListContainer>
  );
};

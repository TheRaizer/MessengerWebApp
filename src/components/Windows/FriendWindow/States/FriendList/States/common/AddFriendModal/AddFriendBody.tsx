import { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../../../../common/Input';
import { fetchNextAPI } from '../../../../../../../../helpers/api/api';
import { emitErrorToast } from '../../../../../../../../helpers/toast/toast';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';
import { nextCursorSWRGetKey } from '../../../../../../../../helpers/pagination';
import { FriendshipData } from '../../../../../../../../../types/responseData/FriendshipData';
import { AddFriendBodyProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/AddFriendModal/AddFriendBody.type';
import { Spinner } from '../../../../../../../Loading/Spinner';
import { FRIEND_LIMIT } from '../../../../../../../../constants/pagination';
import { sanitize } from 'dompurify';

const Styled = {
  Title: styled.h3`
    font-size: 1.5em;
    font-weight: normal;
  `,
  InputsContainer: styled.div`
    display: flex;
    gap: 7px;
  `,
  AddButton: styled.button`
    background-color: white;
    width: 75px;
    height: 25px;
    border: 1px solid black;

    &:hover {
      filter: brightness(0.7);
    }
  `,
};

export const AddFriendBody = ({
  onRequestComplete,
}: AddFriendBodyProps): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const { mutate } = useSWRConfig();

  const addFriend = useCallback(() => {
    setLoading(true);
    const sanitizedUsername = sanitize(username);
    fetchNextAPI<FriendshipData>(
      `friends/requests?username=${sanitizedUsername}`,
      'POST'
    )
      .then(({ data: friendshipData }) => {
        if (!friendshipData?.detail) {
          // instead of refetching we can mutate the SWR cached list and insert the new user
          mutate(
            // serialize key for proper swr infinite mutation
            unstable_serialize(
              nextCursorSWRGetKey('friends/requests/recievers', FRIEND_LIMIT)
            )
          )
            .then(() => onRequestComplete())
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
        } else {
          emitErrorToast(friendshipData.detail);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [mutate, onRequestComplete, username]);

  return (
    <>
      <Styled.Title>Add Friend</Styled.Title>
      <Styled.InputsContainer>
        <Input
          labelText="username"
          onChange={(evt) => setUsername(evt.target.value)}
          onEnter={addFriend}
        />
        {loading ? (
          <Spinner color="black" size={0.8} />
        ) : (
          <Styled.AddButton onClick={addFriend}>add</Styled.AddButton>
        )}
      </Styled.InputsContainer>
    </>
  );
};

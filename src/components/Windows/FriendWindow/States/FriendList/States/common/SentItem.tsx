import { ReactElement, useState } from 'react';
import { FriendInfo } from './FriendInfo';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { ItemButton } from './ItemPillButton';
import { fetchNextAPI } from '../../../../../../../helpers/api/api';
import { Spinner } from '../../../../../../Loading/Spinner';

export const SentItem = ({
  friendUsername,
  mutate,
}: FriendItemProps): ReactElement => {
  const [loading, setLoading] = useState(false);

  return (
    <FriendInfo friendUsername={friendUsername}>
      {loading ? (
        <Spinner color="black" size={1} />
      ) : (
        <ItemButton
          onClick={() => {
            setLoading(true);

            fetchNextAPI(
              `friends/requests/cancel?request_addressee_username=${friendUsername}`,
              'POST'
            ).catch((err) => console.error(err));

            mutate((data) => {
              data?.forEach((cursorModel) => {
                cursorModel.results = cursorModel.results.filter(
                  (userModel) => userModel.username !== friendUsername
                );
              });

              return data;
            })
              .catch((err) => console.error(err))
              .finally(() => setLoading(false));
          }}
        >
          Cancel
        </ItemButton>
      )}
    </FriendInfo>
  );
};

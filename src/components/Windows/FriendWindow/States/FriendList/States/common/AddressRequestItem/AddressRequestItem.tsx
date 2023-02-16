import { ReactElement, useState } from 'react';
import { fetchNextAPI } from '../../../../../../../../helpers/api/api';
import { Spinner } from '../../../../../../../Loading/Spinner';
import { FriendInfo } from '../FriendInfo';
import { ItemButton } from '../ItemPillButton';
import { AddressRequestItemProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/AddressRequestItem.type';

export const AddressRequestItem = ({
  friendUsername,
  mutate,
  getRoute,
  routeMethod,
  buttonText,
  onClick,
}: AddressRequestItemProps): ReactElement => {
  const [loading, setLoading] = useState(false);

  return (
    <FriendInfo friendUsername={friendUsername}>
      {loading ? (
        <Spinner color="black" size={1} />
      ) : (
        <ItemButton
          onClick={() => {
            setLoading(true);

            fetchNextAPI(getRoute(friendUsername), routeMethod)
              .then(() => {
                // instead of refetching we remove user with a specified username from SWR cache
                mutate()
                  .catch((err) => console.error(err))
                  .finally(() => setLoading(false));
                onClick?.();
              })
              .catch((err) => console.error(err))
              .finally(() => setLoading(false));
          }}
        >
          {buttonText}
        </ItemButton>
      )}
    </FriendInfo>
  );
};

import { ReactElement, useState } from 'react';
import { fetchNextAPI } from '../../../../../../../helpers/api/api';
import { Spinner } from '../../../../../../Loading/Spinner';
import { FriendInfo } from './FriendInfo';
import { ItemButton } from './ItemPillButton';
import { AddressRequestItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/AddressRequestItem.type';

export const AddressRequestItem = ({
  friendUsername,
  mutate,
  getRoute,
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

            fetchNextAPI(getRoute(friendUsername), 'POST').catch((err) =>
              console.error(err)
            );

            mutate((data) => {
              const newData = data ? [...data] : [];
              newData?.forEach((cursorModel) => {
                cursorModel.results = cursorModel.results.filter(
                  (userModel) => userModel.username !== friendUsername
                );
              });

              return newData;
            })
              .catch((err) => console.error(err))
              .finally(() => setLoading(false));

            onClick?.();
          }}
        >
          {buttonText}
        </ItemButton>
      )}
    </FriendInfo>
  );
};

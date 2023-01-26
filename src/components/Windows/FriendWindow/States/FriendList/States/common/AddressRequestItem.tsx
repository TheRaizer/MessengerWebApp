import { ReactElement, useState } from 'react';
import { FriendItemProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem.type';
import { fetchNextAPI } from '../../../../../../../helpers/api/api';
import { Spinner } from '../../../../../../Loading/Spinner';
import { FriendInfo } from './FriendInfo';
import { ItemButton } from './ItemPillButton';

export type AddressRequestItemProps = {
  getRoute: (friendUsername: string) => string;
  buttonText: string;
} & FriendItemProps;

export const AddressRequestItem = ({
  friendUsername,
  mutate,
  getRoute,
  buttonText,
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
          {buttonText}
        </ItemButton>
      )}
    </FriendInfo>
  );
};

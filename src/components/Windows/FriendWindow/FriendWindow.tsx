import { ReactElement } from 'react';
import { WithRequired } from '../../../../types/Required.type';
import { WindowContainer } from '../WindowContainer';
import { GeneralWindowProps } from '../../../../types/redux/states/windows.type';
import { FriendsList } from './FriendList/FriendsList';

export const FriendWindow = ({
  id,
}: WithRequired<GeneralWindowProps, 'id'>): ReactElement => {
  return (
    <WindowContainer title={'Friends'} windowId={id}>
      <FriendsList />
    </WindowContainer>
  );
};

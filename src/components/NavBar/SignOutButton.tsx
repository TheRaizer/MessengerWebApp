import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { PageRoutes } from '../../constants/pageRoutes';
import { fetchNextAPI } from '../../helpers/api/api';
import { usePageRouting } from '../../hooks/actions/usePageRouting';
import { useAppDispatch } from '../../redux/hooks';
import { reset as resetUserState } from '../../redux/slices/userSlice';
import { closeSocket } from '../../helpers/sockets/socketio';
import { useSWRConfig } from 'swr';
import { reset as resetFriendStatusesState } from '../../redux/slices/friendStatusesSlice';
import { reset as resetWindowsState } from '../../redux/slices/windowsSlice';

const Styled = {
  Button: styled.button`
    display: flex;
  `,
};

const PowerIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsPower)
);

export const SignOutButton = (): ReactElement => {
  const dispatch = useAppDispatch();
  const routeToHome = usePageRouting(PageRoutes.HOME);
  const { cache } = useSWRConfig();

  const signout = () => {
    fetchNextAPI('auth/sign-out', 'PUT')
      .then(() => {
        // disconnect socket
        closeSocket();

        // clear swr cache
        // the documented way to clear cache in SWR v2 docs does not work
        Array.from(cache.keys()).forEach((key) => {
          cache.delete(key);
        });

        // reset states
        dispatch(resetFriendStatusesState());
        dispatch(resetUserState());
        dispatch(resetWindowsState());

        routeToHome();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Styled.Button onClick={signout}>
      <PowerIcon />
    </Styled.Button>
  );
};

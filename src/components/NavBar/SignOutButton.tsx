import dynamic from 'next/dynamic';
import { ReactElement, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { PageRoutes } from '../../constants/pageRoutes';
import { fetchNextAPI } from '../../helpers/api/api';
import { usePageRouting } from '../../hooks/actions/usePageRouting';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';

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

  const signout = useCallback(() => {
    fetchNextAPI('auth/sign-out', 'PUT')
      .then(() => {
        dispatch(setUserState(undefined));
        routeToHome();
      })
      .catch((err) => console.error(err));
  }, [dispatch, routeToHome]);

  return (
    <Styled.Button onClick={signout}>
      <PowerIcon />
    </Styled.Button>
  );
};

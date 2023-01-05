import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';
import { fetchNextAPI } from '../../helpers/api/api';
import { UserData } from '../../../types/redux/states/user.type';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNextAPI<UserData>('user', 'GET')
      .then(({ data }) => {
        dispatch(setUserState(data.user));
      })
      .catch((err) => {
        dispatch(setUserState(undefined));
        console.error(err);
      });
  }, [dispatch]);
};

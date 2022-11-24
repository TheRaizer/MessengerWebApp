import { useEffect } from 'react';
import { UserData } from '../../../types/redux/states/user.type';
import { fetchNextAPI } from '../../helpers/api/api';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNextAPI<UserData>('users/current', 'GET')
      .then(({ data }) => {
        dispatch(setUserState(data.user));
      })
      .catch((err) => {
        dispatch(setUserState(undefined));
        console.error(err);
      });
  }, [dispatch]);
};

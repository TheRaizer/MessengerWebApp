import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';
import { CookieKeys, getCookie } from '../../helpers/cookie';
import { UserStateProps } from '../../../types/redux/states/user.type';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access_token = getCookie(CookieKeys.ACCESS_TOKEN);
    try {
      const userStateProps = jwt_decode<UserStateProps>(access_token);
      dispatch(setUserState(userStateProps));
    } catch (err) {
      dispatch(setUserState(undefined));
    }
  }, [dispatch]);
};

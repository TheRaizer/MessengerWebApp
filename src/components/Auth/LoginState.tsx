import { ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import {
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import { ChangeStateProp } from '../../../types/hooks/useStateMachine.type';
import { AuthRequirements } from '../../../types/pages/api/auth/auth.type';
import { UserData } from '../../../types/redux/states/user.type';
import { fetchNextAPI } from '../../helpers/api/api';
import { useInputWithState } from '../../hooks/useInputWithState';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';
import { Button } from '../common/Button';
import { CenteredCol } from '../common/Col';

const Styled = {
  LoginButton: styled(Button)`
    background-color: white;
  `,
};

export const LoginState = ({
  changeState,
  getInputProps,
}: AuthStateProps[AuthStates.LOGIN] &
  ChangeStateProp<AuthStates, AuthStateProps>): ReactElement => {
  const dispatch = useAppDispatch();
  const { inputValue: email, InputComponent: EmailInput } = useInputWithState(
    getInputProps('email')
  );
  const { inputValue: password, InputComponent: PasswordInput } =
    useInputWithState(getInputProps('password'));

  const login = useCallback(() => {
    const body: AuthRequirements = {
      email,
      password,
    };

    fetchNextAPI<UserData>('auth/login', 'POST', body)
      .then(({ data }) => {
        if (data.detail || !data.user) {
          throw new Error(data.detail);
        }

        dispatch(setUserState(data.user));
      })
      .catch((err) => console.error(err));
  }, [dispatch, email, password]);

  return (
    <CenteredCol gap={50}>
      <CenteredCol gap={20}>
        {EmailInput}
        {PasswordInput}
      </CenteredCol>
      <CenteredCol gap={20}>
        <Styled.LoginButton
          onClick={login}
          dimensions={{ width: '165px', height: '35px' }}
        >
          login
        </Styled.LoginButton>
        <button
          onClick={() =>
            changeState(AuthStates.SIGN_UP, { changeState, getInputProps })
          }
        >
          sign up
        </button>
      </CenteredCol>
    </CenteredCol>
  );
};

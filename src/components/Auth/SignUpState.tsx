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

export const SignUpState = ({
  changeState,
  getInputProps,
}: AuthStateProps[AuthStates.SIGN_UP] &
  ChangeStateProp<AuthStates, AuthStateProps>): ReactElement => {
  const dispatch = useAppDispatch();

  const { inputValue: username, InputComponent: UsernameInput } =
    useInputWithState(getInputProps('username'));
  const { inputValue: email, InputComponent: EmailInput } = useInputWithState(
    getInputProps('email')
  );
  const { inputValue: password, InputComponent: PasswordInput } =
    useInputWithState(getInputProps('password'));
  const { inputValue: confirmPassword, InputComponent: ConfirmPasswordInput } =
    useInputWithState(getInputProps('confirm password'));

  const signUp = useCallback(() => {
    if (password !== confirmPassword) {
      throw new Error('passwords do not match');
    }

    const body: AuthRequirements = {
      email,
      password,
    };

    fetchNextAPI<UserData>(`auth/sign-up?username=${username}`, 'POST', body)
      .then(({ data }) => {
        if (data.detail || !data.user) {
          throw new Error(data.detail);
        }

        dispatch(setUserState(data.user));
      })
      .catch((err) => console.error(err));
  }, [confirmPassword, dispatch, email, password, username]);

  return (
    <CenteredCol gap={50}>
      <CenteredCol gap={20}>
        {EmailInput}
        {UsernameInput}
        {PasswordInput}
        {ConfirmPasswordInput}
      </CenteredCol>
      <CenteredCol gap={20}>
        <Styled.LoginButton
          onClick={signUp}
          dimensions={{ width: '165px', height: '35px' }}
        >
          sign up
        </Styled.LoginButton>
        <button
          onClick={() =>
            changeState(AuthStates.LOGIN, { changeState, getInputProps })
          }
        >
          login
        </button>
      </CenteredCol>
    </CenteredCol>
  );
};

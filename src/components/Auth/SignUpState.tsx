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
import { isEmailValid } from '../../helpers/auth/isEmailValid';
import { isPasswordValid } from '../../helpers/auth/isPasswordValid';
import { isUsernameValid } from '../../helpers/auth/isUsernameValid';
import { useSignUpInput } from '../../hooks/useSignUpInput';
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
  const {
    Component: EmailInput,
    text: email,
    checkValidity: checkEmailValidity,
  } = useSignUpInput(getInputProps('email'), 'email invalid', isEmailValid);
  const {
    Component: UsernameInput,
    text: username,
    checkValidity: checkUsernameValidity,
  } = useSignUpInput(
    getInputProps('username'),
    'username invalid',
    isUsernameValid
  );
  const {
    Component: PasswordInput,
    text: password,
    checkValidity: checkPasswordValidity,
  } = useSignUpInput(
    getInputProps('password'),
    'password invalid',
    isPasswordValid
  );
  const {
    Component: ConfirmPasswordInput,
    checkValidity: checkConfirmPasswordValidity,
  } = useSignUpInput(
    getInputProps('confirm password'),
    'passwords do not match',
    (confirmPasswordInput) => ({
      isValid: password === confirmPasswordInput,
      errors: [],
    })
  );

  const signUp = useCallback(() => {
    let validInputs = true;
    if (!checkEmailValidity()) validInputs = false;
    if (!checkPasswordValidity()) validInputs = false;
    if (!checkUsernameValidity()) validInputs = false;
    if (!checkConfirmPasswordValidity()) validInputs = false;
    if (!validInputs) return;

    const body: AuthRequirements = {
      email,
      password,
    };

    fetchNextAPI<UserData>(`auth/sign-up?username=${username}`, 'POST', body)
      .then(({ data }) => {
        if (data.detail || !data.user) throw new Error(data.detail);

        dispatch(setUserState(data.user));
      })
      .catch((err) => console.error(err));
  }, [
    checkConfirmPasswordValidity,
    checkEmailValidity,
    checkPasswordValidity,
    checkUsernameValidity,
    dispatch,
    email,
    password,
    username,
  ]);

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

import { ReactElement } from 'react';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import {
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import {
  EmailError,
  UsernameError,
} from '../../../types/helpers/auth/Errors.type';
import { ChangeStateProp } from '../../../types/hooks/useStateMachine.type';
import { AuthRequirements } from '../../../types/pages/api/auth/auth.type';
import { UserData } from '../../../types/redux/states/user.type';
import { fetchNextAPI } from '../../helpers/api/api';
import { isEmailValid } from '../../helpers/auth/isEmailValid';
import { isPasswordValid } from '../../helpers/auth/isPasswordValid';
import { isUsernameValid } from '../../helpers/auth/isUsernameValid';
import { useKeyListener } from '../../hooks/effects/useKeyListener';
import { useSignUpInput } from '../../hooks/useSignUpInput';
import { useAppDispatch } from '../../redux/hooks';
import { ChangeAuthStateButton, ChangeAuthStateText } from './AuthStyled';
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
  } = useSignUpInput(getInputProps('email'));
  const {
    Component: UsernameInput,
    text: username,
    checkValidity: checkUsernameValidity,
  } = useSignUpInput(getInputProps('username'));
  const {
    Component: PasswordInput,
    text: password,
    checkValidity: checkPasswordValidity,
  } = useSignUpInput(getInputProps('password'));
  const {
    Component: ConfirmPasswordInput,
    checkValidity: checkConfirmPasswordValidity,
  } = useSignUpInput(getInputProps('confirm password'));

  const signUp = () => {
    let validInputs = true;
    if (!checkEmailValidity('invalid email', isEmailValid)) validInputs = false;
    if (!checkPasswordValidity('invalid password', isPasswordValid))
      validInputs = false;
    if (!checkUsernameValidity('invalid username', isUsernameValid))
      validInputs = false;
    if (
      !checkConfirmPasswordValidity(
        'passwords do not match',
        (confirmPasswordInput) => ({
          isValid: password === confirmPasswordInput,
          errors: [],
        })
      )
    )
      validInputs = false;
    if (!validInputs) return;

    const body: AuthRequirements = {
      email,
      password,
    };

    fetchNextAPI<UserData>(`auth/sign-up?username=${username}`, 'POST', body)
      .then(({ data }) => {
        if (data.detail || !data.user) {
          switch (data.detail) {
            case EmailError.ACCOUNT_EXISTS:
              checkEmailValidity(
                'account already exists with this email',
                () => ({
                  isValid: false,
                  errors: [EmailError.ACCOUNT_EXISTS],
                })
              );
              break;
            case UsernameError.USERNAME_TAKEN:
              checkUsernameValidity('username taken', () => ({
                isValid: false,
                errors: [UsernameError.USERNAME_TAKEN],
              }));
          }
        }

        dispatch(setUserState(data.user));
      })
      .catch((err) => console.error(err));
  };

  useKeyListener(signUp, Key.Enter);

  return (
    <CenteredCol gap={50}>
      <CenteredCol gap={10}>
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
        <ChangeAuthStateText>
          Have an account already?{' '}
          <ChangeAuthStateButton
            onClick={() =>
              changeState(AuthStates.LOGIN, { changeState, getInputProps })
            }
          >
            Login
          </ChangeAuthStateButton>
          .
        </ChangeAuthStateText>
      </CenteredCol>
    </CenteredCol>
  );
};

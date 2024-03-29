import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import {
  AuthInputProps,
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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChangeAuthStateButton, ChangeAuthStateText } from './AuthStyled';
import { selectUser, setUserState } from '../../redux/slices/userSlice';
import { Button } from '../common/Button';
import { CenteredCol } from '../common/Col';
import { HourGlass } from '../Loading/HourGlass';

const Styled = {
  LoginButton: styled(Button)`
    background-color: white;
  `,
};

export const SignUpState = ({
  changeState,
  inputProps,
}: AuthInputProps &
  ChangeStateProp<AuthStates, AuthStateProps>): ReactElement => {
  const { user } = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    Component: EmailInput,
    text: email,
    checkValidity: checkEmailValidity,
  } = useSignUpInput({
    ...inputProps,
    labelText: 'email',
  });
  const {
    Component: UsernameInput,
    text: username,
    checkValidity: checkUsernameValidity,
  } = useSignUpInput({
    ...inputProps,
    labelText: 'username',
  });
  const {
    Component: PasswordInput,
    text: password,
    checkValidity: checkPasswordValidity,
  } = useSignUpInput({
    ...inputProps,
    labelText: 'password',
    type: 'password',
  });
  const {
    Component: ConfirmPasswordInput,
    checkValidity: checkConfirmPasswordValidity,
  } = useSignUpInput({
    ...inputProps,
    labelText: 'confirm password',
    type: 'password',
  });

  const signUp = () => {
    setLoading(true);
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
    if (!validInputs) return setLoading(false);

    const body: AuthRequirements = {
      email,
      password,
    };

    fetchNextAPI<UserData>(`auth/sign-up?username=${username}`, 'POST', body)
      .then(({ data }) => {
        if (data.detail || !data.user) {
          switch (data.detail) {
            case EmailError.ACCOUNT_EXISTS:
              checkEmailValidity('account already exists', () => ({
                isValid: false,
                errors: [EmailError.ACCOUNT_EXISTS],
              }));
              break;
            case UsernameError.USERNAME_TAKEN:
              checkUsernameValidity('username taken', () => ({
                isValid: false,
                errors: [UsernameError.USERNAME_TAKEN],
              }));
              break;
          }
          return;
        }

        dispatch(setUserState(data.user));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useKeyListener(signUp, Key.Enter);

  return (
    <CenteredCol gap={50}>
      {loading || user !== undefined ? (
        <HourGlass
          size={1}
          backgroundColor="var(--primary-color)"
          fillColor="black"
        />
      ) : (
        <>
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
                  changeState(AuthStates.LOGIN, { changeState, inputProps })
                }
              >
                Login
              </ChangeAuthStateButton>
              .
            </ChangeAuthStateText>
          </CenteredCol>
        </>
      )}
    </CenteredCol>
  );
};

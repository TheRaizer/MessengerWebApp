import dynamic from 'next/dynamic';
import { ReactElement, useCallback, useMemo } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import {
  AuthProps,
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import {
  ChangeStateProp,
  StatesDictionary,
} from '../../../types/hooks/useStateMachine.type';
import { useStateMachine } from '../../hooks/statemachine/useStateMachine';
import { CenteredCol } from '../common/Col';

const Styled = {
  AuthContainer: styled.div`
    display: flex;
    justify-content: center;
    padding-top: 5%;
    width: 100%;
    height: 100%;
  `,
  Header: styled.h1`
    font-size: 45px;
  `,
};

const CgProfile = dynamic<IconBaseProps>(() =>
  import('react-icons/cg').then((mod) => mod.CgProfile)
);
const LoginState = dynamic<
  AuthStateProps[AuthStates.LOGIN] & ChangeStateProp<AuthStates, AuthStateProps>
>(() => import('./LoginState').then((mod) => mod.LoginState));
const SignUpState = dynamic<
  AuthStateProps[AuthStates.SIGN_UP] &
    ChangeStateProp<AuthStates, AuthStateProps>
>(() => import('./SignUpState').then((mod) => mod.SignUpState));

const authStates: StatesDictionary<AuthStates, AuthStateProps> = {
  [AuthStates.LOGIN]: (props) => <LoginState {...props} />,
  [AuthStates.SIGN_UP]: (props) => <SignUpState {...props} />,
};

export const Auth = ({ initialState }: AuthProps): ReactElement => {
  const inputDimensions = useMemo(
    () => ({ width: '250px', height: '35px' }),
    []
  );
  const getInputProps = useCallback(
    (labelText: string) => ({
      dimensions: inputDimensions,
      labelText: labelText,
    }),
    [inputDimensions]
  );

  const { CurrentComponent } = useStateMachine(
    authStates,
    initialState || AuthStates.LOGIN,
    { getInputProps }
  );

  return (
    <Styled.AuthContainer>
      <CenteredCol gap={36}>
        <CgProfile size={180} />
        <Styled.Header>Login</Styled.Header>
        {CurrentComponent}
      </CenteredCol>
    </Styled.AuthContainer>
  );
};

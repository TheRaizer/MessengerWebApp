import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import {
  AuthProps,
  AuthStateProps,
  AuthStates,
  GetInputProps,
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
  const inputDimensions = { width: '250px', height: '35px' };

  /**
   * We do not need to use useCallback since this component will not rerender often.
   * Thus this function's referential equality will not often change and cause rerenders of the
   * auth state components.
   */
  const getInputProps: GetInputProps = (labelText: string, type?: string) => ({
    dimensions: inputDimensions,
    labelText: labelText,
    type: type,
  });

  const { CurrentComponent, currentState } = useStateMachine(
    authStates,
    initialState || AuthStates.LOGIN,
    { getInputProps }
  );

  const header = currentState === AuthStates.LOGIN ? 'Login' : 'Sign Up';

  return (
    <Styled.AuthContainer>
      <CenteredCol gap={36}>
        <CgProfile size={180} />
        <Styled.Header>{header}</Styled.Header>
        {CurrentComponent}
      </CenteredCol>
    </Styled.AuthContainer>
  );
};

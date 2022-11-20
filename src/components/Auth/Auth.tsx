import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import {
  AuthProps,
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import { State } from '../../../types/hooks/useStateMachine.type';
import { useStateMachine } from '../../hooks/useStateMachine';
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
const LoginState = dynamic<AuthStateProps>(() =>
  import('./LoginState').then((mod) => mod.LoginState)
);
const SignUpState = dynamic<AuthStateProps>(() =>
  import('./SignUpState').then((mod) => mod.SignUpState)
);

const authStates: Record<AuthStates, State<AuthStates, AuthStateProps>> = {
  [AuthStates.LOGIN]: (props) => <LoginState {...props} />,
  [AuthStates.SIGN_UP]: (props) => <SignUpState {...props} />,
};

export const Auth = ({ initialState }: AuthProps): ReactElement => {
  const { CurrentComponent } = useStateMachine(
    authStates,
    initialState || AuthStates.LOGIN,
    {}
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

import { ReactElement } from 'react';
import styled from 'styled-components';
import {
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import { Button } from '../common/Button';
import { CenteredCol } from '../common/Col';
import { Input } from '../common/Input';

const Styled = {
  LoginButton: styled(Button)`
    background-color: white;
  `,
};

export const LoginState = ({ changeState }: AuthStateProps): ReactElement => {
  return (
    <CenteredCol gap={50}>
      <CenteredCol gap={20}>
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="email"
        />
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="password"
        />
      </CenteredCol>
      <CenteredCol gap={20}>
        <Styled.LoginButton
          onClick={() => {
            console.log('RUN');
          }}
          dimensions={{ width: '165px', height: '35px' }}
        >
          login
        </Styled.LoginButton>
        <button
          onClick={() => changeState(AuthStates.SIGN_UP, { changeState })}
        >
          sign up
        </button>
      </CenteredCol>
    </CenteredCol>
  );
};

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

export const SignUpState = ({ changeState }: AuthStateProps): ReactElement => {
  return (
    <CenteredCol gap={50}>
      <CenteredCol gap={20}>
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="email"
        />
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="username"
        />
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="password"
        />
        <Input
          dimensions={{ width: '250px', height: '35px' }}
          labelText="confirm password"
        />
      </CenteredCol>
      <CenteredCol gap={20}>
        <Styled.LoginButton
          onClick={() => {
            console.log('RUN');
          }}
          dimensions={{ width: '165px', height: '35px' }}
        >
          sign up
        </Styled.LoginButton>
        <button onClick={() => changeState(AuthStates.LOGIN, { changeState })}>
          login
        </button>
      </CenteredCol>
    </CenteredCol>
  );
};

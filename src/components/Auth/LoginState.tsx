import { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import {
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import { ChangeStateProp } from '../../../types/hooks/useStateMachine.type';
import { AuthRequirements } from '../../../types/pages/api/auth/auth.type';
import { UserData } from '../../../types/redux/states/user.type';
import { fetchNextAPI } from '../../helpers/api/api';
import { useKeyListener } from '../../hooks/effects/useKeyListener';
import { useAppDispatch } from '../../redux/hooks';
import { setUserState } from '../../redux/slices/userSlice';
import { Button } from '../common/Button';
import { CenteredCol } from '../common/Col';
import { Input } from '../common/Input';
import { HourGlass } from '../Loading/HourGlass';
import { ChangeAuthStateButton, ChangeAuthStateText } from './AuthStyled';
import { emitErrorToast } from '../../helpers/toast/toast';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
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
      .catch((err: Error) => {
        console.error(err);
        emitErrorToast(err.message);
        setLoading(false);
      });
  };

  useKeyListener(login, Key.Enter);

  return (
    <CenteredCol gap={50}>
      {loading ? (
        <HourGlass
          size={1}
          backgroundColor="var(--primary-color)"
          fillColor="black"
        />
      ) : (
        <>
          <CenteredCol gap={20}>
            <Input
              {...getInputProps('email')}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setEmail(evt.target.value)
              }
            />
            <Input
              {...getInputProps('password', 'password')}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setPassword(evt.target.value)
              }
            />
          </CenteredCol>
          <CenteredCol gap={20}>
            <Styled.LoginButton
              onClick={login}
              dimensions={{ width: '165px', height: '35px' }}
            >
              login
            </Styled.LoginButton>
            <ChangeAuthStateText>
              No account?{' '}
              <ChangeAuthStateButton
                onClick={() =>
                  changeState(AuthStates.SIGN_UP, {
                    changeState,
                    getInputProps,
                  })
                }
              >
                Create one
              </ChangeAuthStateButton>
              .
            </ChangeAuthStateText>
          </CenteredCol>
        </>
      )}
    </CenteredCol>
  );
};

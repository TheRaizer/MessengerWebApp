import { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import {
  AuthInputProps,
  AuthStateProps,
  AuthStates,
} from '../../../types/components/Auth/Auth.type';
import { ChangeStateProp } from '../../../types/hooks/useStateMachine.type';
import { AuthRequirements } from '../../../types/pages/api/auth/auth.type';
import { UserData } from '../../../types/redux/states/user.type';
import { fetchNextAPI } from '../../helpers/api/api';
import { useKeyListener } from '../../hooks/effects/useKeyListener';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser, setUserState } from '../../redux/slices/userSlice';
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
  inputProps,
}: AuthInputProps &
  ChangeStateProp<AuthStates, AuthStateProps>): ReactElement => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email || !password) {
      emitErrorToast('you need to fill in all fields!');
      return;
    }

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
        emitErrorToast(err.message);
        setLoading(false);
      });
  };

  useKeyListener(login, Key.Enter);

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
          <CenteredCol gap={20}>
            <Input
              {...inputProps}
              labelText={'email'}
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setEmail(evt.target.value)
              }
            />
            <Input
              {...inputProps}
              labelText={'password'}
              type={'password'}
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
                    inputProps,
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

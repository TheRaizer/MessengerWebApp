import { ChangeStateProp } from '../../hooks/useStateMachine.type';

export enum AuthStates {
  LOGIN = 'login',
  SIGN_UP = 'sign_up',
}

export type AuthProps = {
  initialState?: AuthStates;
};

export type AuthStateProps = ChangeStateProp<AuthStates, AuthStateProps>;

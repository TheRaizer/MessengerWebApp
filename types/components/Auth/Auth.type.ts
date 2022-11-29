import { ChangeStateProp } from '../../hooks/useStateMachine.type';
import { InputProps } from '../common/Input.type';

export enum AuthStates {
  LOGIN = 'login',
  SIGN_UP = 'sign_up',
}

export type AuthProps = {
  initialState?: AuthStates;
};

type AuthInputProps = {
  getInputProps: (labelText: string) => InputProps;
};

export interface AuthStateProps
  extends ChangeStateProp<AuthStates, AuthStateProps> {
  [AuthStates.LOGIN]: AuthInputProps;
  [AuthStates.SIGN_UP]: AuthInputProps;
}

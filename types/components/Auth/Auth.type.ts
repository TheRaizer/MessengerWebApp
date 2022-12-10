import { ChangeStateProp } from '../../hooks/useStateMachine.type';
import { InputProps } from '../common/Input.type';

export enum AuthStates {
  LOGIN = 'login',
  SIGN_UP = 'sign_up',
}

export type AuthProps = {
  initialState?: AuthStates;
};

export type GetInputProps = (labelText: string, type?: string) => InputProps;

type AuthInputProps = {
  getInputProps: GetInputProps;
};

export interface AuthStateProps
  extends ChangeStateProp<AuthStates, AuthStateProps> {
  [AuthStates.LOGIN]: AuthInputProps;
  [AuthStates.SIGN_UP]: AuthInputProps;
}

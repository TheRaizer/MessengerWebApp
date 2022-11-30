import { ReactElement } from 'react';
import {
  WindowProps,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { WithRequired } from '../../../types/Required.type';
import { WindowContainer } from './WindowContainer';

export const MessageWindow = (
  props: WithRequired<WindowProps[WindowType.MESSAGE], 'id'>
): ReactElement => {
  return (
    <WindowContainer title={props.usernameToMessage || ''} windowId={props.id}>
      <p>
        I am a message window {props.usernameToMessage} with id {props.id}
      </p>
    </WindowContainer>
  );
};

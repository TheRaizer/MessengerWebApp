import { ReactElement } from 'react';
import {
  WindowProps,
  WindowType,
} from '../../../types/redux/states/windows.type';
import { WithRequired } from '../../../types/Required.type';
import { WindowContainer } from './WindowContainer';

export const MessageWindow = ({
  usernameToMessage,
  id,
}: WithRequired<WindowProps[WindowType.MESSAGE], 'id'>): ReactElement => {
  return (
    <WindowContainer title={usernameToMessage || ''} windowId={id}>
      <p>
        I am a message window {usernameToMessage} with id {id}
      </p>
    </WindowContainer>
  );
};

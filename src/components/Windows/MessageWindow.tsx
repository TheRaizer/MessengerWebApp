import { ReactElement } from 'react';
import { MessageWindowProps } from '../../../types/components/Windows/MessageWindowProps.type';
import { WithRequired } from '../../../types/Required.type';
import { WindowContainer } from './WindowContainer';

export const MessageWindow = (
  props: WithRequired<MessageWindowProps, 'id'>
): ReactElement => {
  return (
    <WindowContainer title={props.usernameToMessage || ''}>
      <p>
        I am a message window {props.usernameToMessage} with id {props.id}
      </p>
    </WindowContainer>
  );
};

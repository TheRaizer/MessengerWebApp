import { ReactElement } from 'react';
import { MessageWindowProps } from '../../../types/components/Windows/MessageWindowProps.type';
import { WithRequired } from '../../../types/WithRequired.type';

export const MessageWindow = (
  props: WithRequired<MessageWindowProps, 'id'>
): ReactElement => {
  return (
    <div>
      <p>
        I am a message window {props.usernameToMessage} with id {props.id}
      </p>
    </div>
  );
};

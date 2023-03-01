import { ReactElement } from 'react';
import {
  WindowProps,
  WindowType,
} from '../../../../types/redux/states/windows.type';
import { WithRequired } from '../../../../types/Required.type';
import { WindowContainer } from '../WindowContainer';
import { useStateMachine } from '../../../hooks/statemachine/useStateMachine';
import {
  ChangeStateProp,
  StatesDictionary,
} from '../../../../types/hooks/useStateMachine.type';
import {
  MessageWindowStateProps,
  MessageWindowStates,
} from '../../../../types/components/Windows/MessageWindow/MessageWindow.type';
import dynamic from 'next/dynamic';
import { FriendItemProps } from '../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/FriendItem.type';

const Conversation = dynamic<
  Omit<FriendItemProps, 'mutate'> &
    ChangeStateProp<MessageWindowStates, MessageWindowStateProps>
>(() =>
  import('./States/Conversation/Conversation').then((mod) => mod.Conversation)
);

const ConversationsList = dynamic<
  ChangeStateProp<MessageWindowStates, MessageWindowStateProps>
>(() =>
  import('./States/ConversationsList/ConversationsList').then(
    (mod) => mod.ConversationsList
  )
);

const messageWindowStates: StatesDictionary<
  MessageWindowStates,
  MessageWindowStateProps
> = {
  [MessageWindowStates.CONVERSATION]: (props) => <Conversation {...props} />,
  [MessageWindowStates.CONVERSATIONS_LIST]: (props) => (
    <ConversationsList {...props} />
  ),
};

export const MessageWindow = ({
  id,
}: WithRequired<WindowProps[WindowType.MESSAGE], 'id'>): ReactElement => {
  const { CurrentComponent } = useStateMachine(
    messageWindowStates,
    MessageWindowStates.CONVERSATIONS_LIST,
    {}
  );

  return (
    <WindowContainer title={'Message'} windowId={id}>
      {CurrentComponent}
    </WindowContainer>
  );
};

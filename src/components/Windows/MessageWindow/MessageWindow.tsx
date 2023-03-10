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
import { FriendItemProps } from '../../../../types/components/Windows/FriendWindow/FriendList/common/FriendItem/FriendItem.type';

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
  friendUsername,
  friendId,
}: WithRequired<WindowProps[WindowType.MESSAGE], 'id'>): ReactElement => {
  const initialState =
    friendUsername === undefined || friendId === undefined
      ? MessageWindowStates.CONVERSATIONS_LIST
      : MessageWindowStates.CONVERSATION;

  const initialStateProps:
    | Omit<FriendItemProps, 'mutate'>
    | Record<string, never> =
    friendUsername === undefined || friendId === undefined
      ? {}
      : { friendUsername, friendId };
  const { CurrentComponent } = useStateMachine(
    messageWindowStates,
    initialState,
    initialStateProps
  );

  return (
    <WindowContainer title={'Message'} windowId={id}>
      {CurrentComponent}
    </WindowContainer>
  );
};

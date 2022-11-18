import { ReactElement } from 'react';
import { FriendWindowProps } from '../../../types/components/Windows/FriendWindowProps.type';
import { WithRequired } from '../../../types/WithRequired.type';

export const FriendWindow = (
  props: WithRequired<FriendWindowProps, 'id'>
): ReactElement => {
  return (
    <div>
      <p>
        I am a friend window {props.friendUsername} with id {props.id}
      </p>
    </div>
  );
};

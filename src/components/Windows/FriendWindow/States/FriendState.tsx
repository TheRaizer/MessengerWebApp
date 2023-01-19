import { ReactElement } from 'react';
import {
  FriendsStateProps,
  FriendWindowStates,
} from '../../../../../types/components/Windows/FriendWindow/FriendWindow.type';
import { ChangeStateProp } from '../../../../../types/hooks/useStateMachine.type';

export const FriendState = (
  props: FriendsStateProps[FriendWindowStates.FRIEND] &
    ChangeStateProp<FriendWindowStates, FriendsStateProps>
): ReactElement => {
  return (
    <p>
      {props.friendUsername}
      IAM: These are roles that you can assign to user groups. These user groups
      then contain users that can be assigned to real people or applications. A
      user can be assigned a password and/or an access key/id. For applications,
      we don&lsquo;t need to give them a password since they won&lsquo;t
      actually need to access the AWS console. For real people, we can assign
      them both or just a password. There are also Policies that you can create
      in IAM. There are both custom and pre-made policies (custom-managed or
      AWS-managed). For example, I can have a policy that allows the connect
      action to be performed on RDSs that fall under a given ARN (Amazon
      resource names). The resource name would specify the following:
    </p>
  );
};

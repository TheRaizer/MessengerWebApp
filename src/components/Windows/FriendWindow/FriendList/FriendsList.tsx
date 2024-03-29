import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Header } from './common/Header';
import { IconBaseProps } from 'react-icons';
import { AddFriendModal } from './States/common/AddFriendModal/AddFriendModal';
import { FriendListStates, FriendListStateProps } from '../../../../../types/components/Windows/FriendWindow/FriendList/FriendList.type';
import { ChangeStateProp, StatesDictionary } from '../../../../../types/hooks/useStateMachine.type';
import { useStateMachine } from '../../../../hooks/statemachine/useStateMachine';
import { Col } from '../../../common/Col';

const Styled = {
  OpenModalButton: styled.button`
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    position: absolute;
    bottom: 10px;
    right: 25px;
    width: 32px;
    height: 32px;
    z-index: 10;
  `,
  ModalContainer: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
  `,
  Container: styled(Col)`
    position: relative;
    width: 100%;
    height: 100%;
  `,
};

const PlusCircleIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bs').then((mod) => mod.BsPlusCircle)
);

const Friends = dynamic<
  ChangeStateProp<FriendListStates, FriendListStateProps>
>(() => import('./States/Friends').then((mod) => mod.Friends));

const Recieved = dynamic<
  ChangeStateProp<FriendListStates, FriendListStateProps>
>(() => import('./States/Recieved').then((mod) => mod.Recieved));

const Sent = dynamic<ChangeStateProp<FriendListStates, FriendListStateProps>>(
  () => import('./States/Sent').then((mod) => mod.Sent)
);

const friendWindowStates: StatesDictionary<
  FriendListStates,
  FriendListStateProps
> = {
  [FriendListStates.FRIENDS]: (props) => <Friends {...props} />,
  [FriendListStates.RECIEVED]: (props) => <Recieved {...props} />,
  [FriendListStates.SENT]: (props) => <Sent {...props} />,
};

export const FriendsList = (): ReactElement => {
  const [openModal, setOpenModal] = useState(false);
  const { CurrentComponent, changeState, currentState } = useStateMachine(
    friendWindowStates,
    FriendListStates.FRIENDS,
    {}
  );

  return (
    <Styled.Container>
      <Header
        changeState={
          changeState as (
            newState: FriendListStates,
            props: ChangeStateProp<FriendListStates, FriendListStateProps>
          ) => void
        }
        currentState={currentState}
      />
      <Styled.OpenModalButton onClick={() => setOpenModal(true)}>
        <PlusCircleIcon size={'2em'} />
      </Styled.OpenModalButton>
      {CurrentComponent}
      {openModal && (
        <Styled.ModalContainer>
          <AddFriendModal onClose={() => setOpenModal(false)} />
        </Styled.ModalContainer>
      )}
    </Styled.Container>
  );
};

import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { AddFriendBody } from './AddFriendBody';
import { RequestCompleteBody } from './RequestCompleteBody';
import { AddFriendModalProps } from '../../../../../../../../types/components/Windows/FriendWindow/FriendList/common/AddFriendModal/AddFriendModal.type';
import { CenteredCol } from '../../../../../../common/Col';

const Styled = {
  ModalContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
  ModalBody: styled(CenteredCol)`
    position: relative;
    z-index: 2;
    width: 340px;
    height: 135px;
    background-color: var(--primary-color);
    box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.4);
    justify-content: center;
  `,
  BackgroundFilter: styled.div`
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.493);
  `,
  CloseButton: styled.button`
    position: absolute;
    top: 0;
    right: 0;
  `,
};

const Close = dynamic<IconBaseProps>(() =>
  import('react-icons/ai').then((mod) => mod.AiOutlineCloseSquare)
);

export const AddFriendModal = ({
  onClose,
}: AddFriendModalProps): ReactElement => {
  const [requestComplete, setRequestComplete] = useState(false);

  return (
    <Styled.ModalContainer>
      <Styled.ModalBody gap={20}>
        <Styled.CloseButton onClick={onClose}>
          <Close size={'1.3em'} />
        </Styled.CloseButton>
        {requestComplete ? (
          <RequestCompleteBody />
        ) : (
          <AddFriendBody onRequestComplete={() => setRequestComplete(true)} />
        )}
      </Styled.ModalBody>
      <Styled.BackgroundFilter onClick={onClose} />
    </Styled.ModalContainer>
  );
};

import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import styled from 'styled-components';
import { CenteredCol } from '../../../../../../common/Col';
import { Input } from '../../../../../../common/Input';
import { fetchNextAPI } from '../../../../../../../helpers/api/api';
import { emitErrorToast } from '../../../../../../../helpers/toast/toast';
import { AddFriendModalProps } from '../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/AddFriendModal.type';

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
  Title: styled.h3`
    font-size: 1.5em;
    font-weight: normal;
  `,
  InputsContainer: styled.div`
    display: flex;
    gap: 7px;
  `,
  AddButton: styled.button`
    background-color: white;
    width: 75px;
    height: 25px;
    border: 1px solid black;

    &:hover {
      filter: brightness(0.7);
    }
  `,
};

const Close = dynamic<IconBaseProps>(() =>
  import('react-icons/ai').then((mod) => mod.AiOutlineCloseSquare)
);

export const AddFriendModal = ({
  onClose,
}: AddFriendModalProps): ReactElement => {
  const [username, setUsername] = useState('');

  return (
    <Styled.ModalContainer>
      <Styled.ModalBody gap={20}>
        <Styled.CloseButton onClick={onClose}>
          <Close size={'1.3em'} />
        </Styled.CloseButton>
        <Styled.Title>Add Friend</Styled.Title>
        <Styled.InputsContainer>
          <Input
            labelText="username"
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <Styled.AddButton
            onClick={() => {
              fetchNextAPI(`friends/requests/send?username=${username}`, 'POST')
                .then(({ data }) => {
                  if (!data?.detail) {
                    // success
                  } else {
                    emitErrorToast(data.detail);
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            add
          </Styled.AddButton>
        </Styled.InputsContainer>
      </Styled.ModalBody>
      <Styled.BackgroundFilter onClick={onClose} />
    </Styled.ModalContainer>
  );
};

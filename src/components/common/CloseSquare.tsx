import { ReactElement } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import styled from 'styled-components';
import { useCloseModal } from '../../hooks/actions/modal/useCloseModal';

const StyledCloseSquare = styled(AiOutlineCloseSquare)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.8em;
  margin: 10px 10px;
  cursor: pointer;
`;

export const CloseSquare = (): ReactElement => {
  const closeModal = useCloseModal();
  return <StyledCloseSquare onClick={() => closeModal()} />;
};

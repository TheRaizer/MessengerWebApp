import { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import { modalBGBlurIndex, modalIndex } from '../../constants/zIndices';
import { getModalComponent } from '../../helpers/getModalComponent';
import { useCloseModal } from '../../hooks/actions/useCloseModal';
import { useAppSelector } from '../../redux/hooks';
import { selectModal } from '../../redux/slices/modalSlice';
import { BackgroundBlur } from '../common/BackgroundBlur';

const Styled = {
  ModalContainer: styled.div`
    z-index: ${modalIndex};
    position: relative;
  `,
};

const Modal = (): ReactElement | null => {
  const modal = useAppSelector(selectModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = useCloseModal();

  if (!modal.open) return null;

  const ModalComponent = getModalComponent(modal.modalType);

  return (
    <>
      <BackgroundBlur onClick={() => closeModal()} zIndex={modalBGBlurIndex} />
      <Styled.ModalContainer ref={modalRef}>
        <ModalComponent />
      </Styled.ModalContainer>
    </>
  );
};

export default Modal;

import { useInitializeModalState } from './useInitializeModalState';
import { ModalState } from '../../../types/redux/states/modalState.type';
import { useAppSelector } from '../../redux/hooks';
import { selectModal } from '../../redux/slices/modalSlice';

export const useCloseModal = () => {
  const modal = useAppSelector(selectModal);

  const closedModalState: ModalState = { ...modal, open: false };

  const closeModal = useInitializeModalState(closedModalState);

  return closeModal;
};

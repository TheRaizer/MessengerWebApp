import { useCallback } from 'react';
import { ModalState } from '../../../types/redux/states/modalState.type';
import { useAppDispatch } from '../../redux/hooks';
import { changeModal } from '../../redux/slices/modalSlice';

/**
 *
 * @param newModalState the modal state that the returned function will initialize
 * @returns a function to change to the newModalState.
 */
export const useInitializeModalState = (newModalState: ModalState) => {
  const dispatch = useAppDispatch();

  /**
   * A function to initialize a new modal state. This effectively changes the modal state
   * if the change is permitted. The props given to the hook will be passed to the modal.
   */
  const initializeModalState = useCallback(() => {
    const newState: ModalState = { ...newModalState };
    dispatch(changeModal(newState));
  }, [dispatch, newModalState]);

  return initializeModalState;
};

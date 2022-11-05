import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ModalState,
  ModalType,
} from '../../../types/redux/states/modalState.type';
import { addNoScroll, removeNoScroll } from '../../helpers/manageNoScroll';
import { RootState } from '../../../types/redux/store.type';

const initialState: Readonly<ModalState> = {
  open: false,
  modalType: ModalType.NONE,
  allowOnlySelectModalChanges: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<ModalState>) => {
      //* IF we only allow changes from the current modal to a set of select modals
      //* AND (there are no selectModals OR there are select modals and the new modal type is not contained in the selectModals array)
      //* THEN do not change from the current modal
      if (
        state.allowOnlySelectModalChanges &&
        (!state.selectModals ||
          state.selectModals.length === 0 ||
          !state.selectModals.includes(action.payload.modalType))
      ) {
        return state;
      }

      if (action.payload.open) {
        addNoScroll();
      } else {
        removeNoScroll();
      }

      state.modalType = action.payload.modalType;
      state.allowOnlySelectModalChanges =
        action.payload.allowOnlySelectModalChanges;
      state.selectModals = action.payload.selectModals;
      state.open = action.payload.open;
    },
    resetModal: () => initialState,
  },
});

export const { changeModal, resetModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export const modalReducer = modalSlice.reducer;

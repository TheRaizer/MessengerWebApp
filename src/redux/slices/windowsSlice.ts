import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WindowIdentifier,
  WindowIdProp,
  WindowState,
  WindowStateValues,
} from '../../../types/redux/states/windows.type';
import { RootState } from '../../../types/redux/store.type';
import { AllRequired } from '../../../types/Required.type';

const windowsSlice = createSlice({
  name: 'windowsSlice',
  initialState: {} as WindowState,
  reducers: {
    addWindow: (
      state,
      action: PayloadAction<AllRequired<WindowIdProp> & WindowStateValues>
    ) => {
      const { id, windowType, windowProps } = action.payload;
      state[id] = {
        windowType: windowType,
        windowProps: windowProps,
      };
    },
    removeWindow: (
      state,
      action: PayloadAction<AllRequired<WindowIdentifier>>
    ) => {
      delete state[action.payload];
    },
  },
});

export const { addWindow, removeWindow } = windowsSlice.actions;

export const selectWindows = (state: RootState) => state.windows;

export const windowsReducer = windowsSlice.reducer;

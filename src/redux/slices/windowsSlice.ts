import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WindowIdentifier,
  WindowState,
  WindowStateValues,
} from '../../../types/redux/states/windows.type';
import { RootState } from '../../../types/redux/store.type';

const windowsSlice = createSlice({
  name: 'windowsSlice',
  initialState: {} as WindowState,
  reducers: {
    addWindow: (
      state,
      action: PayloadAction<{ id: WindowIdentifier } & WindowStateValues>
    ) => {
      const { id, windowType, windowProps } = action.payload;
      state[id] = {
        windowType: windowType,
        windowProps: windowProps,
      };
    },
    removeWindow: (state, action: PayloadAction<WindowIdentifier>) => {
      delete state[action.payload];
    },
  },
});

export const { addWindow, removeWindow } = windowsSlice.actions;

export const selectWindows = (state: RootState) => state.windows;
export const selectWindow = (id: WindowIdentifier) => (state: RootState) =>
  state.windows[id];

export const windowsReducer = windowsSlice.reducer;

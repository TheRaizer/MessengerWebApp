import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WindowIdentifier,
  WindowStateValue,
} from '../../../types/redux/states/windows.type';
import { RootState } from '../../../types/redux/store.type';

const windowsSlice = createSlice({
  name: 'windowsSlice',
  initialState: [] as WindowStateValue[],
  reducers: {
    setWindows: (state, action: PayloadAction<WindowStateValue>) => {
      state.push(action.payload);
    },
    removeWindow: (state, action: PayloadAction<WindowIdentifier>) => {
      const idx = state.findIndex((window) => window.id === action.payload);

      state.splice(idx, 1);
    },
  },
});

export const { setWindows, removeWindow } = windowsSlice.actions;

export const selectWindows = (state: RootState) => state.windows;

export const windowsReducer = windowsSlice.reducer;

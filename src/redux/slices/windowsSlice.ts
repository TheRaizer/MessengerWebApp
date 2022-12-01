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
      action: PayloadAction<
        AllRequired<WindowIdProp> & Omit<WindowStateValues, 'zIndex'>
      >
    ) => {
      const { id, windowType, windowProps } = action.payload;
      state[id] = {
        windowType: windowType,
        windowProps: windowProps,
        zIndex: Object.keys(state).length,
      };
    },
    removeWindow: (
      state,
      action: PayloadAction<AllRequired<WindowIdentifier>>
    ) => {
      delete state[action.payload];
    },
    changeActiveWindow: (state, action: PayloadAction<string>) => {
      const windowsArr = Object.entries(state);

      for (let i = 0; i < windowsArr.length; i++) {
        const window = windowsArr[i];

        if (window[0] === action.payload) {
          windowsArr.splice(i, 1);
          windowsArr.push(window);

          windowsArr.forEach((window, idx) => (window[1].zIndex = idx));
          return;
        }
      }

      console.error('window with id ' + action.payload + ' does not exist');
    },
  },
});

export const { addWindow, removeWindow } = windowsSlice.actions;

export const selectWindows = (state: RootState) => state.windows;

export const windowsReducer = windowsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WindowStateValue } from '../../../types/redux/states/windows.type';
import { RootState } from '../../../types/redux/store.type';

const windowsSlice = createSlice({
  name: 'windowsSlice',
  initialState: [] as WindowStateValue[],
  reducers: {
    setWindows: (state, action: PayloadAction<WindowStateValue>) => {
      state.push(action.payload);

      return state;
    },
  },
});

export const { setWindows } = windowsSlice.actions;

export const selectWindows = (state: RootState) => state.windows;

export const windowsReducer = windowsSlice.reducer;

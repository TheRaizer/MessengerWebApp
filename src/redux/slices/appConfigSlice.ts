import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AppConfigState,
  ViewportStates,
} from '../../../types/redux/states/appConfig.type';
import { RootState } from '../../../types/redux/store.type';

const initialState: Readonly<AppConfigState> = {
  viewportState: ViewportStates.DESKTOP,
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setViewportState: (state, action: PayloadAction<ViewportStates>) => {
      state.viewportState = action.payload;
    },
  },
});

export const { setViewportState } = appConfigSlice.actions;

export const selectAppConfig = (state: RootState) => state.appConfig;

export const appConfigReducer = appConfigSlice.reducer;

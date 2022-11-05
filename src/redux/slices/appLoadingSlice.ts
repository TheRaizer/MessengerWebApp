import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/redux/store.type';

const appLoadingSlice = createSlice({
  name: 'appLoading',
  initialState: false,
  reducers: {
    setLoading: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setLoading } = appLoadingSlice.actions;

export const selectAppLoading = (state: RootState) => state.appLoading;

export const appLoadingReducer = appLoadingSlice.reducer;

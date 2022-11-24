import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UserState,
  UserStateProps,
} from '../../../types/redux/states/user.type';
import { RootState } from '../../../types/redux/store.type';

const initialState: Readonly<UserState> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (
      state,
      action: PayloadAction<UserStateProps | undefined>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;

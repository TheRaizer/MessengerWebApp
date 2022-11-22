import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../../types/redux/states/user.type';
import { RootState } from '../../../types/redux/store.type';

const initialState: Readonly<Partial<UserState>> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (_state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUser = (state: RootState) => state.appConfig;

export const userReducer = userSlice.reducer;

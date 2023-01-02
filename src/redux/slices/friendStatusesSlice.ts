import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/redux/store.type';
import { ActiveStatus } from '../../../types/components/Windows/FriendList/FriendItem.type';
import { StatusChangeData } from '../../../types/SocketData.type';

const initialState: { [key: number]: ActiveStatus } = {};

const friendStatusesSlice = createSlice({
  name: 'friendStatuses',
  initialState: initialState,
  reducers: {
    addOrUpdateStatus: (state, action: PayloadAction<StatusChangeData>) => {
      state[action.payload.user_id] = action.payload.status;
      return state;
    },
    removeStatus: (state, action: PayloadAction<{ user_id: number }>) => {
      delete state[action.payload.user_id];
    },
  },
});

export const { addOrUpdateStatus, removeStatus } = friendStatusesSlice.actions;

export const selectFriendStatuses = (state: RootState) => state.friendStatuses;

export const friendStatusesReducer = friendStatusesSlice.reducer;

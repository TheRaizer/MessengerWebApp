import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/redux/store.type';
import { StatusChangeEventData } from '../../../types/SocketData.type';
import { ActiveStatus } from '../../../types/components/Windows/FriendWindow/FriendList/common/FriendItem/FriendItem.type';

const initialState: { [key: number]: ActiveStatus } = {};

const friendStatusesSlice = createSlice({
  name: 'friendStatuses',
  initialState: initialState,
  reducers: {
    addOrUpdateStatus: (
      state,
      action: PayloadAction<StatusChangeEventData>
    ) => {
      state[action.payload.user_id] = action.payload.status;
      return state;
    },
    removeStatus: (state, action: PayloadAction<{ user_id: number }>) => {
      delete state[action.payload.user_id];
    },
    reset: () => initialState,
  },
});

export const { addOrUpdateStatus, removeStatus, reset } =
  friendStatusesSlice.actions;

export const selectFriendStatuses = (state: RootState) => state.friendStatuses;

export const friendStatusesReducer = friendStatusesSlice.reducer;

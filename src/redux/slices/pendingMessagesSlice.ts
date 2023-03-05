import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/redux/store.type';
import { PendingMessageState } from '../../../types/redux/states/pendingMessages.type';
import { MessageModel } from '../../../types/Models/MessageModel.type';

const initialState: PendingMessageState = {};

const pendingMessagesSlice = createSlice({
  name: 'pendingMessages',
  initialState: initialState,
  reducers: {
    addPendingMessage: (
      state,
      action: PayloadAction<{
        recieverId: number;
        message: MessageModel;
        recieverUsername?: string;
      }>
    ) => {
      const message = action.payload.message;

      if (message.message_tracking_id === undefined) {
        throw new Error('message must contain a tracking id');
      }

      if (state[action.payload.recieverId] === undefined) {
        state[action.payload.recieverId] = {};
      }

      state[action.payload.recieverId][message.message_tracking_id] = {
        message: message,
        recieverUsername: action.payload.recieverUsername,
      };

      return state;
    },
    removePendingMessage: (
      state,
      action: PayloadAction<{ recieverId: number; message_tracking_id: number }>
    ) => {
      if (action.payload.message_tracking_id === undefined) {
        throw new Error('message must contain a tracking id');
      }
      delete state[action.payload.recieverId][
        action.payload.message_tracking_id
      ];
    },
    reset: () => initialState,
  },
});

export const { addPendingMessage, removePendingMessage, reset } =
  pendingMessagesSlice.actions;

export const selectPendingMessages = (state: RootState) =>
  state.pendingMessages;

export const pendingMessagesReducer = pendingMessagesSlice.reducer;

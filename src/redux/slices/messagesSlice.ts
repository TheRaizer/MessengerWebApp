import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types/redux/store.type';
import { MessageModel } from '../../../types/Models/MessageModel.type';
import {
  MessageState,
  MessageStatus,
} from '../../../types/redux/states/messages.type';

const initialState: MessageState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        friendId: number;
        messageId: string;
        messageStatus: MessageStatus;
        message: MessageModel;
      }>
    ) => {
      const message = action.payload.message;

      if (state[action.payload.friendId] === undefined) {
        state[action.payload.friendId] = [];
      }

      state[action.payload.friendId].unshift({
        message: message,
        messageStatus: action.payload.messageStatus,
      });

      return state;
    },
    changeMessageStatus: (
      state,
      action: PayloadAction<{
        friendId: number;
        messageId: string;
        newStatus: MessageStatus;
      }>
    ) => {
      if (!state[action.payload.friendId]) {
        return state;
      }

      const message = state[action.payload.friendId].find(
        (message) => message.message.message_id == action.payload.messageId
      );

      if (message) {
        message.messageStatus = action.payload.newStatus;
      }

      return state;
    },
    reset: () => initialState,
  },
});

export const { addMessage, changeMessageStatus, reset } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages;

export const messagesReducer = messagesSlice.reducer;

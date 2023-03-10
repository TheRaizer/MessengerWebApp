import {
  AnyAction,
  Reducer,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { appConfigReducer } from './slices/appConfigSlice';
import { appLoadingReducer } from './slices/appLoadingSlice';
import { modalReducer } from './slices/modalSlice';
import { userReducer } from './slices/userSlice';
import { windowsReducer } from './slices/windowsSlice';
import { friendStatusesReducer } from './slices/friendStatusesSlice';
import { messagesReducer } from './slices/messagesSlice';
import { RootState } from '../../types/redux/store.type';

export const combinedReducer = combineReducers({
  appConfig: appConfigReducer,
  appLoading: appLoadingReducer,
  modal: modalReducer,
  windows: windowsReducer,
  user: userReducer,
  friendStatuses: friendStatusesReducer,
  messages: messagesReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'clear') {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

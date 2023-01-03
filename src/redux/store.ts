import { configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './slices/appConfigSlice';
import { appLoadingReducer } from './slices/appLoadingSlice';
import { modalReducer } from './slices/modalSlice';
import { userReducer } from './slices/userSlice';
import { windowsReducer } from './slices/windowsSlice';
import { friendStatusesReducer } from './slices/friendStatusesSlice';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    appLoading: appLoadingReducer,
    modal: modalReducer,
    windows: windowsReducer,
    user: userReducer,
    friendStatuses: friendStatusesReducer,
  },
});

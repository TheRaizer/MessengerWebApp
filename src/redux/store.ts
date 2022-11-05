import { configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './slices/appConfigSlice';
import { appLoadingReducer } from './slices/appLoadingSlice';
import { modalReducer } from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    appLoading: appLoadingReducer,
    modal: modalReducer,
  },
});

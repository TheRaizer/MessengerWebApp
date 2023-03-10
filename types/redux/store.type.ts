import { combinedReducer, store } from '../../src/redux/store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;

import { configureStore } from '@reduxjs/toolkit';
import tripDataReducer from './tripDataSlice';

const store = configureStore({
  reducer: {
    tripData: tripDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

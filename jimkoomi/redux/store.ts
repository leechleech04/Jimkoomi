import { configureStore } from '@reduxjs/toolkit';
import tripDataReducer from './tripDataSlice';
import checklistReducer from './checklistSlice';

const store = configureStore({
  reducer: {
    tripData: tripDataReducer,
    checklist: checklistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

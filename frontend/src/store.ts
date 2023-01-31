import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';
import shorterSlice from '@/features/shorter/shorterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shorter: shorterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

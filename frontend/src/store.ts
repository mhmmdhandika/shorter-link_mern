import { configureStore } from '@reduxjs/toolkit';
import shorterSlice from '@/features/shorter/shorterSlice';

export const store = configureStore({
  reducer: {
    shorter: shorterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

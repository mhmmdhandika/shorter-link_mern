import { configureStore } from '@reduxjs/toolkit';
import shorterSlice from '@/features/shorter/shorterSlice';
import userSlice from '@/features/user/userSlice';

export const store = configureStore({
  reducer: {
    shorter: shorterSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

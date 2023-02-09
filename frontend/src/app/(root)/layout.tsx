'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { addUser } from '@/features/user/userSlice';

function RootLayout({ children }: { children: React.ReactNode }) {
  const { keyStorage } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const loadedUserData = useLocalStorage('get', keyStorage);

    if (loadedUserData) {
      const parsed = JSON.parse(loadedUserData);
      dispatch(addUser(parsed));
    }
  }, []);

  return <>{children}</>;
}
export default RootLayout;

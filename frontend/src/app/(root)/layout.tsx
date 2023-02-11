'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { addUser } from '@/features/user/userSlice';
import { useEffect } from 'react';

function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, keyStorage } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const loadedUserData = useLocalStorage('get', keyStorage);
    console.log(loadedUserData);
    if (loadedUserData) {
      const parsed = JSON.parse(loadedUserData);
      dispatch(addUser(parsed));
    }
  }, []);

  return <>{children}</>;
}
export default RootLayout;

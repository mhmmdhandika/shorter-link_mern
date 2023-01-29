'use client';

import { PropsWithChildren } from 'react';
import ReduxProvider from './ReduxProvider';

type ProviderProp = PropsWithChildren;

function Providers({ children }: ProviderProp) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
export default Providers;

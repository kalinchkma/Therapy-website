/** @format */

import React from 'react';
import StoreProvider from './StoreProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
	return <StoreProvider>{children}</StoreProvider>;
}

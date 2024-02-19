/** @format */

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const Store = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

// Infer the type of Store
export type AppStore = ReturnType<typeof Store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

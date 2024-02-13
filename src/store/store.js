import { configureStore } from '@reduxjs/toolkit';
import timeManagementReducer from '../features/TimeManagement/timeManagementSlice';

export const store = configureStore({
	reducer: {
		timeManagement: timeManagementReducer,
	},
});

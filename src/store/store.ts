import {configureStore} from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import {loadTasks} from '../utils/storage';

// Load initial state from storage
const preloadedState = {
  tasks: {
    tasks: loadTasks() || [],
  },
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

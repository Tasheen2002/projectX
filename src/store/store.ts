import {configureStore} from '@reduxjs/toolkit';
import taskReducer, {setTasks} from './taskSlice';
import {loadTasks} from '../utils/storage';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Load tasks from AsyncStorage on app startup and dispatch to the store
loadTasks().then(storedTasks => {
  if (storedTasks) {
    store.dispatch(setTasks(storedTasks));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

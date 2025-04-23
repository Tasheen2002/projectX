import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {saveTasks} from '../utils/storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string; // ISO string
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {addTask, updateTask, deleteTask, setTasks} = taskSlice.actions;

// Selectors
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (state: RootState, taskId: string) =>
  state.tasks.tasks.find(task => task.id === taskId);

export default taskSlice.reducer;

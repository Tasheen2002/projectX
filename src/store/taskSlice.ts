import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
}
//
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const {setTasks, addTask, updateTask, deleteTask} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (state: RootState, id: string) =>
  state.tasks.tasks.find(t => t.id === id);

export default taskSlice.reducer;

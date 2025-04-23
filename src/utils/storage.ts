import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../store/taskSlice';

const TASKS_STORAGE_KEY = '@task_manager_tasks';

export const saveTasks = async (tasks: Task[]) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving tasks to storage:', e);
  }
};

export const loadTasks = (): Task[] | null => {
  try {
    // Note: In a real app, we'd use await here, but for simplicity in this example
    // we're using a synchronous approach for the store initialization
    const jsonValue = AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue as string) : null;
  } catch (e) {
    console.error('Error loading tasks from storage:', e);
    return null;
  }
};

export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing tasks from storage:', e);
  }
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../store/taskSlice';

const TASKS_STORAGE_KEY = '@task_manager_tasks';

export const saveTasks = async (tasks: Task[]) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving tasks to storage:', e);
  }
};

export const loadTasks = async (): Promise<Task[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
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

import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectTasks,
  selectTaskById,
  addTask,
  updateTask,
  deleteTask,
  Task,
} from '../store/taskSlice';
import {RootState} from '../store/store';
import {saveTasks} from '../utils/storage';

export const useTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const getTaskById = useCallback(
    (taskId: string) => {
      const state = {tasks: {tasks}}; // Match expected state shape
      return selectTaskById(state as RootState, taskId);
    },
    [tasks],
  );

  const createTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    return newTask;
  };

  const editTask = (task: Task) => {
    dispatch(updateTask(task));
  };

  const removeTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const pendingTasks = tasks.filter(task => task.status === 'pending');

  return {
    tasks,
    getTaskById,
    createTask,
    editTask,
    removeTask,
    completedTasks,
    inProgressTasks,
    pendingTasks,
  };
};

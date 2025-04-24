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

  // Save tasks on every change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const getTaskById = useCallback(
    (taskId: string) => {
      const state = {tasks: {tasks}};
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

  return {
    tasks,
    getTaskById,
    createTask,
    editTask,
    removeTask,
  };
};

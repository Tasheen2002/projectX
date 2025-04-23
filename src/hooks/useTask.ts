import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectTasks,
  selectTaskById,
  addTask,
  updateTask,
  deleteTask,
  Task,
} from '../store/taskSlice';

export const useTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const getTaskById = useCallback((taskId: string) => {
    return useSelector(state => selectTaskById(state, taskId));
  }, []);

  const createTask = useCallback(
    (task: Omit<Task, 'id'>) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(), // Simple ID generation
      };
      dispatch(addTask(newTask));
      return newTask;
    },
    [dispatch],
  );

  const editTask = useCallback(
    (task: Task) => {
      dispatch(updateTask(task));
    },
    [dispatch],
  );

  const removeTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTask(taskId));
    },
    [dispatch],
  );

  return {
    tasks,
    getTaskById,
    createTask,
    editTask,
    removeTask,
  };
};

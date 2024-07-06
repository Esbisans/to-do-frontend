
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewTask, onDeleteTask, onSetActiveTask, onSetDragAnimation, onSetTask, onUpdateEvent } from '../store/task/taskSlice';

export const useTaskStore = () => {

    const dispatch = useDispatch();
    const { tasks, activeTask, dragAnimation } = useSelector((state) => state.task);

    const setActiveTask = (taskId) => {
      dispatch(onSetActiveTask(taskId));
    }
    
    const startSettingTasks = (tasks) => {
      dispatch(onSetTask(tasks));
    }

    const startAddingTask = (task) => {
      dispatch(onAddNewTask(task));
    }

    const startUpdatingTask = (task) => {
      dispatch(onUpdateEvent(task));
    }

    const startDeletingTask = (taskId) => {
      dispatch(onDeleteTask(taskId));
    }

    const setDragAnimation = (dragAnimation) => {
      dispatch(onSetDragAnimation(dragAnimation));
    }

  return {
    // Properties
    tasks,
    activeTask,
    dragAnimation,
    // Methods
    setActiveTask,
    startAddingTask,
    startSettingTasks,
    startDeletingTask,
    startUpdatingTask,
    setDragAnimation
  }
}

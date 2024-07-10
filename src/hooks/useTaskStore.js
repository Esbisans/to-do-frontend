import { useDispatch, useSelector } from 'react-redux';
import { 
        onAddNewTask, 
        onDeleteTask, 
        onUpdateEvent, 
        onSetActiveColumn, 
        onSetActiveTask, 
        onSetTasks, 
} from '../store/task/taskSlice';
import taskApi from '../api/taskApi';
import Swal from 'sweetalert2'

export const useTaskStore = () => {

    const dispatch = useDispatch();
    const { tasks, activeTask, activeColumn } = useSelector((state) => state.task);

    const setActiveTask = (taskId) => {
      dispatch(onSetActiveTask(taskId));
    }

    const setActiveColumn = (columnId) => {
      dispatch(onSetActiveColumn(columnId));
    }
    
    // Load the tasks from the server
    const startLoadingTasks = async() => {
      try {
        const { data } = await taskApi.get('/tasks');
        dispatch(onSetTasks(data.tasks));
      } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    }

    // Set the tasks to the server
    const startSettingTasks = async(tasks) => {
      try {
        const { data } = await taskApi.put('/tasks/set', tasks);
        dispatch(onSetTasks(data.newTasks));
      } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    }

    // Set the tasks to the local environment
    const setTasks = (tasks) => {
      dispatch(onSetTasks(tasks));
    }

    // Add a new task to the server
    const startAddingTask = async(task) => {
      try { 
        const {data} = await taskApi.post('/tasks', task);
        dispatch(onAddNewTask(data.task));

      } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    }

    // Update the task to the server
    const startUpdatingTask = async(task) => {
      try {
        const { data } = await taskApi.put(`/tasks/${task.id}`, task);
        dispatch(onUpdateEvent(data.task));
      } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    }

    // Delete the task to the server
    const startDeletingTask = async(taskId) => {
      try {
        await taskApi.delete(`/tasks/${taskId}`);
        dispatch(onDeleteTask(taskId));
      } catch (error) {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    }

  return {
    // Properties
    tasks,
    activeTask,
    activeColumn,
    // Methods
    setActiveTask,
    setActiveColumn,
    startAddingTask,
    startSettingTasks,
    startDeletingTask,
    startUpdatingTask,
    startLoadingTasks,
    setTasks
  }
}

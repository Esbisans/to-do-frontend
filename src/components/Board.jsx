import { useEffect } from 'react';
import { 
DndContext, 
DragOverlay, 
PointerSensor, 
useSensor, 
useSensors 
} from '@dnd-kit/core';
import { arrayMove} from '@dnd-kit/sortable';
import { ColumnContainer } from './ColumnContainer'
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../hooks/useTaskStore';
import { useUserInterfaceStore } from '../hooks/useUserInterfaceStore';

export const Board = () => {

  const { 
          tasks, 
          activeTask, 
          setActiveTask, 
          setTasks, 
          startLoadingTasks, 
          startSettingTasks 
        } = useTaskStore();
  const { setDragAnimation } = useUserInterfaceStore();

  const columns = [
    {
      id:'column-1',
      title: 'To do',
    },
    {
      id: 'column-2',
      title: 'In progress',
    },
    {
      id: 'column-3',
      title: 'Done',
    },
  ]

  useEffect(() => {
    startLoadingTasks();
  }, []);

  //This is the hook that set the sensor when drag it moves
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function onDragStart(event) {
    const { active } = event;
    setActiveTask(active.id);
  }

  function onDragEnd(event) {

    setActiveTask(null);
    setDragAnimation(false);
    const { active, over } = event;
    if (!over) return;
    //if(active.id === over.id) return 
    startSettingTasks(tasks);
  }

  //This function allows changes position of the tasks 
  const onDragOver = (event) => {
    setDragAnimation(true);

    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    //This is the condition if the task is over the column or over another task
    const overColumn = over.data.current.sortable?.containerId === 'Sortable';

    //This is the condition if the task is over the column
    if (overColumn) {

      //This is the index of the active task
      const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
      
      //This is the new tasks array with the new columnId
      let newTasks = [...tasks];
      newTasks[activeTaskIndex] = {
        ...newTasks[activeTaskIndex],
        columnId: over.id,
      };
      newTasks = arrayMove(newTasks, activeTaskIndex, activeTaskIndex);
      setTasks(newTasks);
    } 
      //This is the condition if the task is over another task
      else {
      
      //This is the index of the active task and the over task
      const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
      const overTaskIndex = tasks.findIndex(task => task.id === over.id);
      
      let newTasks = [...tasks];
      //This is the condition if the task is over another task in another column
      if (newTasks[activeTaskIndex].columnId !== newTasks[overTaskIndex].columnId) {

        //This is the new tasks array with the new columnId
        newTasks[activeTaskIndex] = {
          ...newTasks[activeTaskIndex],
          columnId: newTasks[overTaskIndex].columnId,
        };
        //This is the new tasks array with the new position
        newTasks = arrayMove(newTasks, activeTaskIndex, overTaskIndex - 1);
        setTasks(newTasks);

      } 
        //This is the condition if the task is over another task in the same column
        else {
        newTasks = arrayMove(newTasks, activeTaskIndex, overTaskIndex);
        setTasks(newTasks);
      }
    } 

  }


  return (
    <>
      <h2 className='text-center mb-4'>To-Do App</h2>
      <DndContext

        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
                // collisionDetection={closestCenter}
      >
        <div className='container d-flex flex-row gap-5'>
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} tasks={tasks.filter((task) => task.columnId === column.id)}/>
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskItem task={tasks.find(task => task.id === activeTask)}  />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}

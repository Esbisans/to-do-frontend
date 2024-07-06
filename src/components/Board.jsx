import { 
DndContext, 
DragOverlay, 
PointerSensor, 
useSensor, 
useSensors 
} from '@dnd-kit/core';
import { arrayMove} from '@dnd-kit/sortable';
import { useTaskStore } from '../hooks/useTaskStore';
import { TaskItem } from './TaskItem';
import { ColumnContainer } from './ColumnContainer'

export const Board = () => {

  const { tasks, activeTask, setActiveTask, startSettingTasks, setDragAnimation } = useTaskStore();


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
    console.log('tasks', tasks);
    const { active, over } = event;
    if (!over) return;
    if(active.id === over.id) return 

  }

  const onDragOver = (event) => {
    setDragAnimation(true);

    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const overColumn = over.data.current.sortable?.containerId === 'Sortable';

    if (overColumn) {

      const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
      let newTasks = [...tasks];

      newTasks[activeTaskIndex] = {
        ...newTasks[activeTaskIndex],
        columnId: over.id,
      };
      newTasks = arrayMove(newTasks, activeTaskIndex, activeTaskIndex);
      startSettingTasks(newTasks);

    } else {
      
      const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
      const overTaskIndex = tasks.findIndex(task => task.id === over.id);
      
      let newTasks = [...tasks];
      
      if (newTasks[activeTaskIndex].columnId !== newTasks[overTaskIndex].columnId) {

        newTasks[activeTaskIndex] = {
          ...newTasks[activeTaskIndex],
          columnId: newTasks[overTaskIndex].columnId,
        };
        
        newTasks = arrayMove(newTasks, activeTaskIndex, overTaskIndex - 1);
        startSettingTasks(newTasks);

      } else {
        // cambiar orden
        newTasks = arrayMove(newTasks, activeTaskIndex, overTaskIndex);
        startSettingTasks(newTasks);
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

import {SortableContext, arrayMove, useSortable} from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../hooks/useTaskStore';
import addIcon from '../assets/add.svg'

export const ColumnContainer = ({column, tasks}) => {

    const {activeTask, startAddingTask } = useTaskStore()

    const createTask = (columnId) => {

        const newTask = {
            id: generateId(),
            columnId,
            name: 'Task ',
            description: 'Description',
        };

        startAddingTask(newTask)
    }

    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    }
    
  
    const {
        setNodeRef,
      } = useSortable({id: column.id});

    return (
        <>
            <div className='container' id="column-container">

                <div className="column-title">
                    {column.title}
                </div>

                <div 
                    className="column-body"
                    ref={setNodeRef}

                >
                <SortableContext items={tasks}  >
                    {
                        tasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    }
                </SortableContext>            
                </div>       

                <div className='column-footer'>
                    <button 
                        className='btn-add-task'
                        onClick={() => {
                            createTask(column.id)
                        }}
                    >
                    <img src={addIcon} alt="Add logo" className='mx-2' style={{ width: '2em', height: '2em' }} />
                        Add Task
                    </button>
                </div>
            </div>

            {/* {( isModalOpen)&& (
          
                <Modal task={{id: '', name: '', description: '', columnId: column.id}}/>
          
            )} */}
        </>
        
    )
}

import {SortableContext, useSortable} from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import { Modal } from './Modal';
import { useTaskStore } from '../hooks/useTaskStore';
import { useUserInterfaceStore } from '../hooks/useUserInterfaceStore';
import addIcon from '../assets/add.svg'

export const ColumnContainer = ({column, tasks}) => {

    const { setActiveColumn, activeColumn } = useTaskStore()
    const {isModalOpen , openModal} = useUserInterfaceStore();

    const createTask = (columnId) => {
        setActiveColumn(columnId)
        openModal();
    }
  
    //This is the hook for set sortable column
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
            {( isModalOpen && activeColumn === column.id)&& (
          
                <Modal task={{name: '', description: '', columnId: column.id}} action={'Add'}/>
          
            )}
        </>        
    )
}

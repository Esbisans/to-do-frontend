import React, { useState } from 'react'
import TrashIcon from '../icons/trashIcon'
import EditIcon from '../icons/editIcon'
import { LayoutGroup, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useTaskStore } from '../hooks/useTaskStore';
import { useForm } from '../hooks/useForm';
import { Modal } from './Modal';
import { useUserInterfaceStore } from '../hooks/useUserInterfaceStore';

export const TaskItem = ({task}) => {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const motionId = `task-${task.id}`;

        
    const { activeTask, setActiveTask, startDeletingTask, startUpdatingTask, dragAnimation, setDragAnimation } = useTaskStore();
    const {isModalOpen , openModal} = useUserInterfaceStore();
    console.log(dragAnimation)
    const deleteTask = (id) => {
      startDeletingTask(id);
    };

    const handleEditClick = () => {
      setDragAnimation(true);
      setActiveTask(task.id);
      openModal();
    };

    const handleMouseEnter = () => {
        setMouseIsOver(true);
    }

    const handleMouseLeave = () => {
        setMouseIsOver(false);
    }

    //Dnd Drag and Drop
    const {
      setNodeRef,
      attributes,
      listeners,
      transform,
      transition,
      isDragging
    } = useSortable({id: task.id});
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      // zIndex: isDragging ? 0 : 'auto',
      // border: isDragging ? '2px solid blue' : 'none',
      // backgroundColor: isDragging ? 'white' : 'initial',
      // color: isDragging ? 'white' : 'initial',
    };
  
    if (isDragging) {
      return (
        <article
          ref={setNodeRef}
          style={style}
          className='item-container-drag'
        >
          <div className="item-container-name-drag">
            <h5>{task.name}</h5>
            <p>{task.description}</p>
          </div>
        </article>
      );
    }

  return (
    <>

      <LayoutGroup>
        
        <motion.article 
            className="item-container"
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale:1.1 }}
            //layout
            //layoutId={`task-${task.id}`}
            {...(dragAnimation && { layoutId: motionId })}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0}}
            transition={{ type: "spring"}}
        > 
            <div className="item-container-name">
                <h5>{task.name}</h5>
                <p>{task.description}</p>
            </div>
            {
              mouseIsOver &&
              <div className="button-container">
                <button className="btn" onClick={handleEditClick}>
                    <EditIcon />
                </button>
                <button className="btn" onClick={() => deleteTask(task.id)}>
                    <TrashIcon />
                </button>
              </div>
            }

        </motion.article>
        {(activeTask === task.id && isModalOpen)&& (
          
          <Modal task={task}/>
          
      )}
      </LayoutGroup>
    </>
  )
}

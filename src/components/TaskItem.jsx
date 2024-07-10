import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { LayoutGroup, motion } from 'framer-motion';
import { Modal } from './Modal';
import { useTaskStore } from '../hooks/useTaskStore';
import { useUserInterfaceStore } from '../hooks/useUserInterfaceStore';
import EditIcon from '../icons/editIcon'
import TrashIcon from '../icons/trashIcon'

export const TaskItem = ({task}) => {

    // This help us to know if the mouse is over the task for show the buttons
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const motionId = `task-${task.id}`;

    const { activeTask, setActiveTask, startDeletingTask } = useTaskStore();
    const {isModalOpen, dragAnimation, openModal, setDragAnimation} = useUserInterfaceStore();

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

    //Drag and Drop items
    const {
      setNodeRef,
      attributes,
      listeners,
      transform,
      transition,
      isDragging
    } = useSortable({id: task.id});
  
    // This is the style for the drag and drop
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    //This is a item silhouette when is dragging
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

import { useState } from "react";
import { motion } from 'framer-motion';
import { useForm } from "../hooks/useForm";
import { useTaskStore } from "../hooks/useTaskStore";
import { useUserInterfaceStore } from "../hooks/useUserInterfaceStore";
import closeIcon from '../assets/close.svg'

export const Modal = ({task, action}) => {

    const {closeModal, dragAnimation} = useUserInterfaceStore();
    const { 
        startUpdatingTask, 
        setActiveTask, 
        startAddingTask, 
        setActiveColumn 
    } = useTaskStore();
    const [error, setError] = useState(false);
    const motionId = `task-${task.id}`;
    

    const {name, description, formState ,onInputChange} = useForm(
        {
          name: task.name,
          description: task.description,
          columnId: task.columnId,
        }
    );

    const onSubmit = (e) => {
        e.preventDefault();

        // Validate the name
        if (name.trim().length === 0) {
            setError(true);
            return;
        }
        
        // this is for update the task
        if (task.id) {
            startUpdatingTask({...formState, id: task.id});
        } 
            // this is for add a new task
            else {
            startAddingTask(formState);
        }
        
        handleCloseClick();
    }

    const handleCloseClick = () => {
        closeModal();
        setActiveTask(null);
        setActiveColumn(null);
    };

    // This is for close the modal when click outside
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
          handleCloseClick();
        }
    };

    return (
        <motion.div className="modal-backdrop" onClick={handleBackdropClick}>
            <motion.dialog
                className='modal-content'
                //layout
                //layoutId={`task-${task.id}`}
                //{...(dragAnimation && { layoutId: motionId })}
            >
                <form onSubmit={onSubmit}>
                    <header>
                        <h2>{action} task</h2>
                        <button className="close-btn" type="button" onClick={handleCloseClick}>
                            <img src={closeIcon} alt="close icon" style={{ width: '2em', height: '2em' }} />
                        </button>
                    </header>
                    <div className='modal-pad'>
                        <h3 className='modal-label'>Title</h3>
                        <div className='modal-body'>
                            <input 
                                className='modal-input'
                                autoComplete="off"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                                autoFocus
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>This field is required.</p>}
                        <h3 className='modal-label'>Description</h3>
                        <div className='modal-body'>
                            <input 
                                className='modal-input'
                                autoComplete="off"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                            />
                        </div>
                        <button 
                            className='btn-add-task mt-5'
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </motion.dialog>
        </motion.div>
    )
}

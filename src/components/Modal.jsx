import { useForm } from "../hooks/useForm";
import { useTaskStore } from "../hooks/useTaskStore";
import { useUserInterfaceStore } from "../hooks/useUserInterfaceStore";
import { motion } from 'framer-motion';
import closeIcon from '../assets/close.svg'

export const Modal = ({task}) => {

    const {closeModal} = useUserInterfaceStore();
    const { startUpdatingTask, setActiveTask, dragAnimation } = useTaskStore();
    const motionId = `task-${task.id}`;
    

    const {name, description, formState ,onInputChange} = useForm(
        {
          id: task.id,
          name: task.name,
          description: task.description,
          columnId: task.columnId,
        }
    );

    const onSubmit = (e) => {
        e.preventDefault();
        startUpdatingTask(formState);
        handleCloseClick();
    }

    const handleCloseClick = () => {
        closeModal();
        setActiveTask(null);
      };

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
                {...(dragAnimation && { layoutId: motionId })}
            >
                <form onSubmit={onSubmit}>
                    <header>
                        <h2>Update task</h2>
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
                            />
                        </div>
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

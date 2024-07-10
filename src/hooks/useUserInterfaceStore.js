import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal, onSetDragAnimation } from "../store/userInterface/userInterfaceSlice"

export const useUserInterfaceStore = () => {

    const dispatch = useDispatch()
    const {isModalOpen, dragAnimation} = useSelector(state => state.userInterface)

    const openModal = () => {
        dispatch(onOpenModal())
        
    }

    const closeModal = () => {
        dispatch(onCloseModal())
    }

    const toggleModal = () => {
        (isModalOpen)
            ? openModal()
            : closeModal()
    }

    const setDragAnimation = (dragAnimation) => {
        dispatch(onSetDragAnimation(dragAnimation));
    }

    return {
        //Propiedades
        isModalOpen,
        dragAnimation,
        //Métodos
        openModal,
        closeModal,
        toggleModal,
        setDragAnimation
    }

}
import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/userInterface/userInterfaceSlice"

export const useUserInterfaceStore = () => {

    const dispatch = useDispatch()

    const {isModalOpen} = useSelector(state => state.userInterface)

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

    return {
        //Propiedades
        isModalOpen,

        //Métodos
        openModal,
        closeModal,
        toggleModal
    }

}
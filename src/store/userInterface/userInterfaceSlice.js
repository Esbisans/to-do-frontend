import { createSlice } from '@reduxjs/toolkit';

export const userInterfaceSlice = createSlice({
    name: 'userInterface',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        onOpenModal: state => {
            state.isModalOpen = true;
        },
        onCloseModal: state => {
            state.isModalOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = userInterfaceSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

export const userInterfaceSlice = createSlice({
    name: 'userInterface',
    initialState: {
        isModalOpen: false,
        dragAnimation: true,
    },
    reducers: {
        onOpenModal: state => {
            state.isModalOpen = true;
        },
        onCloseModal: state => {
            state.isModalOpen = false;
        },
        onSetDragAnimation: (state, {payload}) => {
            state.dragAnimation = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onSetDragAnimation } = userInterfaceSlice.actions;
import { createSlice } from '@reduxjs/toolkit';

        const newTask = [{
            id: 101010,
            columnId: 'column-1',
            name: 'Task 1 ',
            description: 'Description',
        },
        {
            id: 101011,
            columnId: 'column-2',
            name: 'Task 2',
            description: 'Description',
        },
        {
            id: 101012,
            columnId: 'column-1',
            name: 'Task 3',
            description: 'Description',
        },
        ];

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: newTask,
        activeTask: null,
        dragAnimation: true,
    },
    reducers: {
        onSetActiveTask: (state, {payload}) => {
            state.activeTask = payload;
        },
        onSetDragAnimation: (state, {payload}) => {
            state.dragAnimation = payload;
        },
        onSetTask: (state, {payload}) => {
            state.tasks = payload;
        },
        onAddNewTask: (state, {payload}) => {
            state.tasks.push(payload);
        },
        onDeleteTask: (state, { payload }) => {
            state.tasks = state.tasks.filter(task => task.id !== payload);
        },
        onUpdateEvent: (state, {payload}) => {
            state.tasks = state.tasks.map(
                task => {
                    if(task.id === payload.id){
                        return payload;
                    } else {
                        return task;
                    }
                } 
            );
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveTask, onAddNewTask, onSetTask, onDeleteTask, onUpdateEvent , onSetDragAnimation } = taskSlice.actions;
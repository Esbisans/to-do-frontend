import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./task/taskSlice";
import { userInterfaceSlice } from "./userInterface/userInterfaceSlice";

export const store = configureStore({

    reducer: {
        task: taskSlice.reducer,
        userInterface: userInterfaceSlice.reducer
    }

})
import { configureStore } from "@reduxjs/toolkit";
import modeReducer from '../Actions/modeSlice';


export default configureStore({
    reducer: {
        mode: modeReducer,
    },
});
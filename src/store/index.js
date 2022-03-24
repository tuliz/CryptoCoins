import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../Actions/homeSlice';

export default configureStore({
    reducer: {
       home: homeReducer,
    },
});
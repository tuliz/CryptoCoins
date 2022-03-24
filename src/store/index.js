import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../Actions/homeSlice';
import favortiesReducer from '../Actions/favoritesSlice';

export default configureStore({
    reducer: {
       home: homeReducer,
       favorites: favortiesReducer,
    },
});
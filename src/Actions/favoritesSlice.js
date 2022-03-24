import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favoritesList : [],
        
    },
    reducers: {
        setFavorites: (state, action)=>{
            state.favoritesList.push(action.payload);
        }
    }
})

export const {setFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favoritesList : [],        
        isFavorite: null,
    },
    reducers: {
        addFavorite: (state, action)=>{
            state.favoritesList.push(action.payload);
        },
        removeFavorite: (state, action)=>{
            state.favoritesList = state.favoritesList.filter(favorite=>{return favorite.key !== action.payload});
        },
        setIsFavorite: (state, action)=>{
            state.isFavorite = action.payload;
        }
    }
})

export const {addFavorite, removeFavorite, setIsFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
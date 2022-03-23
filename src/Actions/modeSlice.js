import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
    name: 'mode',
    initialState : {
        value: 'light'
    },
    reducers: {
        lightMode: (state)=>{
            state.value = 'light';
        },

        darkMode: (state)=>{
            state.value = 'dark';
        }
    }
});

export const {lightMode, darkMode} =  modeSlice.actions;
export default modeSlice.reducer;
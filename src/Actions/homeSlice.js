import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        metric: true,
        mode: 'light',
        fiveDaysWeather: [],
        autosearchList: [],
        city: {key: null, name: null},
    },
    reducers: {
        setFiveDaysWeather: (state, action)=>{
            state.fiveDaysWeather = action.payload;
        },
        setAutosearchList: (state, action)=>{
            state.autosearchList = action.payload;
        },
        changeTempMode: (state)=>{
            state.metric = !state.metric;
        },
        changeMode: (state, action)=>{
            state.mode = action.payload;
        },
        setCity: (state, action)=>{
            state.city.key = action.payload.key;
            state.city.name = action.payload.name;
        },
        
    }
})
export const {setFiveDaysWeather, setAutosearchList, changeTempMode, changeMode, setCity} = homeSlice.actions;
export default homeSlice.reducer;
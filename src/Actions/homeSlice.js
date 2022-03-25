import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        metric: true,
        mode: 'light',
        fiveDaysWeather: [],
        autosearchList: [],
        city: {key: 215854, name: 'Tel Aviv'},
        location: {lat : '0', lon: '0'},

    },
    reducers: {
        setFiveDaysWeather: (state, action)=>{
            state.fiveDaysWeather = action.payload;
        },
        setAutosearchList: (state, action)=>{
            state.autosearchList = action.payload;
        },
        changeTempMode: (state, action)=>{
            state.metric = action.payload;
        },
        changeMode: (state, action)=>{
            state.mode = action.payload;
        },
        setCity: (state, action)=>{
            state.city.key = action.payload.key;
            state.city.name = action.payload.name;
        },
        setLocation: (state, action)=>{
            state.location.lat = action.payload.lat;
            state.location.lon = action.payload.lon;
        },
        
    }
})
export const {setFiveDaysWeather, setAutosearchList, changeTempMode, changeMode, setCity, setLocation} = homeSlice.actions;
export default homeSlice.reducer;
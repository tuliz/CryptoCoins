import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        metric: true,
        mode: 'light',
        fiveDaysWeather: [],
        autosearchList: [],
        city: {key: 215854, name: 'Tel Aviv'},
        lat : '0',
        lon: '0',

    },
    reducers: {
        setFiveDaysWeather: (state, action)=>{
            state.fiveDaysWeather = action.payload
        },
        setAutosearchList: (state, action)=>{
            state.autosearchList = action.payload
        },
        celsius: (state)=>{
            state.value = true
        },
        fahrenheit: (state)=>{
            state.value = false
        },
        lightMode: (state)=>{
            state.value = 'light';
        },

        darkMode: (state)=>{
            state.value = 'dark';
        },
       
        setCity: (state, action)=>{
            state.city.key = action.payload.key;
            state.city.name = action.payload.name;
        },
        setGeo: (state, action)=>{
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
        },
        
    }
})
export const {setFiveDaysWeather, setAutosearchList, celsius, fahrenheit, lightMode, darkMode, setCity, setGeo} = homeSlice.actions;
export default homeSlice.reducer;
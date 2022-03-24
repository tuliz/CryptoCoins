import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        metric: true,
        mode: 'light',
        fiveDaysWeather: [],
        autosearchList: [],
        citykey: 215854,
        currentCity: 'Tel Aviv',
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
       
        setCityKey: (state, action)=>{
            state.citykey = action.payload.citykey;
        },
        setCurrentCity: (state, action)=>{
            state.currentCity = action.payload
        },
        setGeo: (state, action)=>{
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
        },
        
    }
})
export const {setFiveDaysWeather, setAutosearchList, celsius, fahrenheit, lightMode, darkMode, setCityKey, setGeo} = homeSlice.actions;
export default homeSlice.reducer;
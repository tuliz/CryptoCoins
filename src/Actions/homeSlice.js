import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        metric: true,
        mode: 'light',
        fiveDaysWeather: [],
        citykey: 215854,
        cityweather: {},
        lat : '0',
        lon: '0'

    },
    reducers: {
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
        setFiveDaysWeather: (state, action)=>{
            state.fiveDaysWeather = action.payload
        },
        setCityKey: (state, action)=>{
            state.citykey = action.payload.citykey;
        },
        setGeo: (state, action)=>{
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
        },
        setCityWeather: (state, action)=>{
            state.cityweather = action.payload.cityweather;
        }
    }
})
export const {celsius, fahrenheit, lightMode, darkMode, setFiveDaysWeather, setCityKey, setGeo, setCityWeather} = homeSlice.actions;
export default homeSlice.reducer;
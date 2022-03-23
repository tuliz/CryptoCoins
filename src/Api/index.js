import axios from "axios";

const Axios = axios.create({
    baseUrl : 'https://dataservice.accuweather.com'
})

const API_KEY = 'jm313LouDB5DR79LXIddBgu67ZcwCVPN';
const AUTOCOMPLETE_URL = '/locations/v1/cities/autocomplete';
const CURRENT_WEATHER_URL = 'currentconditions/v1/';
const FIVE_DAYS_URL = '/forecasts/v1/daily/5day/';
const GEOPOSITION_URL = '/locations/v1/cities/geoposition/search';

export const autocompleteRequest = (searchby) =>{
    const url = `${AUTOCOMPLETE_URL}?apikey=${API_KEY}&q=${searchby}`;
    return Axios.get(url);
}

export const currentWeatherRequest = (searchWord) =>{
    const url = `${CURRENT_WEATHER_URL}?apikey=${API_KEY}&q=${searchWord}`;
    return Axios.get(url);
}

export const fiveDaysRequest = (city, metric) =>{
    const url = `${FIVE_DAYS_URL}${city}?apikey=${API_KEY}&metric=${metric}`;
    return Axios.get(url);
}

export const geopositionRequest = (lat, lon) =>{
    const url = `${GEOPOSITION_URL}?apikey=${API_KEY}&q=${lat}%2C${lon}`;
    return Axios.get(url);
}
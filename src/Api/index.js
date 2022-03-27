import axios from 'axios';

const Axios = axios.create({
    baseURL : 'https://dataservice.accuweather.com' 
});

const API_KEY = 'ciA3cDiAo9WnAjFJgiXBhMLcol0WwoKn';
const AUTOCOMPLETE_URL = '/locations/v1/cities/autocomplete';
const CURRENT_WEATHER_URL = '/currentconditions/v1/';
const FIVE_DAYS_URL = '/forecasts/v1/daily/5day/';
const GEOLOCATION_URL = 'locations/v1/cities/geoposition/search';

export const autocompleteRequest = (searchingBy) => {
    const url = `${AUTOCOMPLETE_URL}?apikey=${API_KEY}&q=${searchingBy}`;
    return Axios.get(url);
}

export const currentWeatherRequest = (searchWord) => {
    const url = `${CURRENT_WEATHER_URL}${searchWord}?apikey=${API_KEY}`;
    return Axios.get(url);
}

export const fiveDaysRequest = (city, fCMode) =>{
    let metric = '';
    if (fCMode === true) {
        metric = "&metric=true"
    }
    const url = `${FIVE_DAYS_URL}${city}?apikey=${API_KEY}${metric}`;
    return Axios.get(url)
}

export const geolocationRequest = (lat, lon) => {
    const url = `${GEOLOCATION_URL}?apikey=${API_KEY}&q=${lat}%2C${lon}`;
    return Axios.get(url);
}

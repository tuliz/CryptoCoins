import styled from '@emotion/styled';
import {Autocomplete, TextField, Button} from "@mui/material";
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCityKey, setGeo, setFiveDaysWeather, setAutosearchList, setCurrentCity } from '../Actions/homeSlice';
import { fiveDaysRequest, autocompleteRequest } from '../Api';

const Div = styled.div`
  margin-top:10px;

  .favorite{color:red;}

  .upperHome{
      display:flex;
  }

  .city{
      display:block;
      font-weight:bold;
  }
`;



 const Home = ()=>{

  const dispatch = useDispatch();
  const[searchby, setSearchby] = useState();
  const fiveDays = useSelector(state=>state.home.fiveDaysWeather);
  const citykey =  useSelector(state=>state.home.citykey);
  const cityName = useSelector(state=>state.home.currentCity);
  const autosearchList = useSelector(state=>state.home.autosearchList);
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(()=>{
   fiveDaysRequest(citykey, true).then(result=>dispatch(setFiveDaysWeather(result.data.DailyForecasts)));
  }, []);

  const getCurrentGeoLocation = () =>{
    const geo = navigator.geolocation;  
    geo.getCurrentPosition(position=>{
            const lat = position.coords.latitude;
           const lon = position.coords.longitude;
           dispatch(setGeo({lat, lon}));
     });
  }

  const getDay = (date) =>{
    let b = date.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0));
  }

  const getCitiesList = (e) =>{
    if(e.target.value != ''){ 
    autocompleteRequest(e.target.value).then(result=>dispatch(setAutosearchList(result.data)));
    setSearchby(e.target.value);
    }
  }

  const getSearchedCity = (e, value) =>{
    fiveDaysRequest(value.Key, true).then(result=>dispatch((setFiveDaysWeather(result.data.DailyForecasts))));
    dispatch(setCurrentCity(value.LocalizedName));
  }

  
    return(
        <Div>
            <Autocomplete 
                  disablePortal
                  renderInput={(params) => <TextField onChange={getCitiesList} {...params} label="City" />}
                  options = {autosearchList}
                  onChange = {getSearchedCity}
                  getOptionLabel= {option=>option.LocalizedName}
                  sx={{width:'50%', margin:'auto'}}
           />

<div className='upperHome'>
             <div className='city'>
               <p>{cityName}</p>
               <p>{0}</p>
             </div>
             <Button className='favorite'><FavoriteBorder/>Add To Favorites</Button>
           </div>
           {fiveDays.map(item=>{
               return <Item key={Math.random()} day={weekDays[getDay(item.Date).getDay()]} date={item.Date} img={item.Day.Icon} degrees={item.Temperature.Maximum.Value} weather={item.Day.IconPhrase}/>
           })}
           

        </Div>
    )
}

export default Home;
import styled from '@emotion/styled';
import {Autocomplete, TextField, Button} from "@mui/material";
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { setCity, setLocation, setFiveDaysWeather, setAutosearchList} from '../Actions/homeSlice';
import { addFavorite, removeFavorite, setIsFavorite } from '../Actions/favoritesSlice';
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
  //const[searchby, setSearchby] = useState();

  const fiveDays = useSelector(state=>state.home.fiveDaysWeather);
  const city =  useSelector(state=>state.home.city);
  const autosearchList = useSelector(state=>state.home.autosearchList);
  const favoritesList = useSelector(state=>state.favorites.favoritesList);
  const isFavorite = useSelector(state=>state.favorites.isFavorite);

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(()=>{
   fiveDaysRequest(city.key, true).then(result=>dispatch(setFiveDaysWeather(result.data.DailyForecasts)));
  }, []);

/*  const getCurrentGeoLocation = () =>{
    navigator.geolocation.getCurrentPosition(position=>{
           dispatch(setLocation({lat: position.coords.latitude, lon: position.coords.longitude}));
     });
  }
*/

  const getDay = (date) =>{
    let b = date.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0));
  }

  const getCitiesList = (e) =>{
    if(e.target.value !== ''){ 
    autocompleteRequest(e.target.value).then(result=>dispatch(setAutosearchList(result.data)));
    //setSearchby(e.target.value);
    }
  }

  const getSearchedCity = (e, value) =>{
    fiveDaysRequest(value.Key, true).then(result=>dispatch((setFiveDaysWeather(result.data.DailyForecasts))));
    dispatch(setCity({key : value.Key, name: value.LocalizedName}));
  }

  /*const isfavorite = () =>{
    favoritesList.forEach(favorite=>{
      if(favorite.name === city.name){
        console.log(favorite.name === city.name);
        return true;
      }
      return false;
    })
  }*/

  //const handleTempChange = ()=>{

  //}

  const handleAddFavoriteClicked = ()=>{
    dispatch(setIsFavorite(true));
    dispatch(addFavorite(city));
  }

  const handleRemoveFavoriteClicked = ()=>{
    dispatch(setIsFavorite(false));
    dispatch(removeFavorite(city.key));
  }

  //const favoriteButton = !isFavorite ? <Button className='favorite' onClick={handleAddFavoriteClicked()}><FavoriteBorder/>Add To Favorites</Button>:
  //<Button onClick={handleRemoveFavoriteClicked()}><Favorite/>Remove From Favorites</Button>;
  
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
        <p>{city.name}</p>
        <Button>F/C</Button>
       </div>
       
       </div>
           {fiveDays.map(item=>{
               return <Item 
               key={Math.random()} 
               day={weekDays[getDay(item.Date).getDay()]}
               date={item.Date} 
               img={item.Day.Icon} 
               degrees={item.Temperature.Maximum.Value} 
               weather={item.Day.IconPhrase}
               />
           })}
           

    </Div>
    )
}

export default Home;
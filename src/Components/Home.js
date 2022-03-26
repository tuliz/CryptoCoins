import styled from '@emotion/styled';
import {Container ,Autocomplete, TextField, Button} from "@mui/material";
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { setCity, setFiveDaysWeather, setAutosearchList, changeTempMode} from '../Actions/homeSlice';
import { addFavorite, removeFavorite, setIsFavorite} from '../Actions/favoritesSlice';
import { fiveDaysRequest, autocompleteRequest } from '../Api';
import moment from 'moment';
import Joi from 'joi';


const validator = {
  search: Joi.string().regex(/^[a-zA-Z ]/).message({
    'string.pattern.base': `Only english letters please`,
  'string.base': `Only english letters please`,
  })
}

const Div = styled.div`
  margin-top:10px;

  .favorite{color:red;}


  .fcBtn{
    color:white;
    background-color:	#606060;
  }

  .cityName{
    font-size:20px;
  }

  .upperHome{
      display:flex;
      align-items: center;
  }

  .WeatherDiv{
        display: flex;
        justify-content: space-between;
        height: 55vh; 
        padding: 0.5rem;
    }

  .city{
      display:block;
      font-weight:bold;
  }
`;



 const Home = ()=>{

  const dispatch = useDispatch();

  const [searchBy, setSearchBy] = useState('');
  const [errorValidation, setErrorValidation] = useState('');

  const fiveDays = useSelector(state=>state.home.fiveDaysWeather);
  const city =  useSelector(state=>state.home.city);
  const autosearchList = useSelector(state=>state.home.autosearchList);
  const favoritesList = useSelector(state=>state.favorites.favoritesList);
  const isFavorite = useSelector(state=>state.favorites.isFavorite);
  const tempMode = useSelector(state=>state.home.metric);

  useEffect(()=>{
   fiveDaysRequest(city.key, tempMode).then(result=>dispatch(setFiveDaysWeather(result.data.DailyForecasts)));
  }, [fiveDays]);


  const getCitiesList = (e) =>{
    if(e.target.value !== ''){ 
    autocompleteRequest(e.target.value).then(result=>dispatch(setAutosearchList(result.data)));
    }
  }

  const getSearchedCity = (e, value) =>{
    fiveDaysRequest(value.Key, tempMode).then(result=>dispatch((setFiveDaysWeather(result.data.DailyForecasts))));
    dispatch(setCity({key : value.Key, name: value.LocalizedName}));
  }


  const checkValidation = (value) =>{
    setSearchBy(value);
    let isValide = true;
    let error = '';

    if (value) {
        const searchObj = validator.search.validate(value);
        if (searchObj.error) {
            error = searchObj.error.message;
            isValide = false;
        }
    }
    (!isValide) ? setErrorValidation(error) : setErrorValidation('');
}

  /*const isFavorite = () =>{
    favoritesList.forEach(favorite=>{
      if(favorite.key === city.key){
        return true;
        }
      return false;
    })
  }
  */

  const handleFCMode = ()=>{
    dispatch(changeTempMode());
  }

  const handleAddFavorite = ()=>{
    dispatch(setIsFavorite(true));
    dispatch(addFavorite(city));
    console.log(favoritesList);
  }

  const handleRemoveFavorite = ()=>{
    dispatch(setIsFavorite(false));
    dispatch(removeFavorite(city.key));
    console.log(favoritesList);
  }

  const favoriteButton = !isFavorite ? <Button className='favorite' onClick={handleAddFavorite}><FavoriteBorder/>Add To Favorites</Button>:
  <Button className='favorite' onClick={handleRemoveFavorite}><Favorite/>Remove From Favorites</Button>;
  
    return(
      <Container maxWidth="lg">

     <Div>
      <Autocomplete 
        blurOnSelect
        options = {autosearchList}
        getOptionLabel= {option=>option.LocalizedName}
        onSelect={e => checkValidation(e.target.value)}
        onChange = {getSearchedCity}
        sx={{width:'50%', margin:'auto'}}
        renderInput={(searchBy) =><div>
         <p className='hhFWoK'>{errorValidation}</p> 
         <TextField {...searchBy} onChange={getCitiesList} label="City" value={searchBy} 
          />
          </div>
          }
    
        />

      <div className='upperHome'>
       <div className='city'>
        <p className='cityName'>{city.name}</p>
        <Button variant="contained" className='fcBtn' onClick={() => handleFCMode()}>F/C</Button>
       </div>
       {favoriteButton}
       
       </div>
       <div className='weatherDiv'>
          {fiveDays.map(item=>{
               return <Item 
               key={Math.random()} 
               day={moment(item.Date).format('dddd')}
               date={moment.parseZone(item.Date).format('DD/MM/YYYY')} 
               img={item.Day.Icon} 
               degrees={`${item.Temperature.Maximum.Value}${tempMode ? '°C`' : '°F'}`} 
               weather={item.Day.IconPhrase}
               />
           })}
       </div>
        
    </Div>
    </Container>
    )
}

export default Home;
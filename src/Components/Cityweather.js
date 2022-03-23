import styled from '@emotion/styled';
import Item from './Item';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import { Button } from '@mui/material';


const Div = styled.div`

`;

const CityWeather = () =>{
    let degrees = 'Fahrenheit';
    const changeDegrees = () =>{
        degrees = degrees === 'Celsius' ? 'Fahrenheit' : 'Celsius'; 
    }
    return(
      <Div>
        <div className='upperHome'>
             <div className='city'>
               <p>Tel-Aviv</p>
               <p>39° {degrees === 'Celsius' ? 'C' : 'F'}</p>
             </div>
             <Button className='favorite'><FavoriteBorder/>Add To Favorites</Button>
           </div>
           {weatherArr.map(item=>{
               return <Item key={item.id} day={item.day} date={item.date} img={item.img} degrees={item.degrees} weather={item.weather}/>
           })}
      </Div>
    )
}

const weatherArr = [
    {
        id: 1,
        day: 'sunday',
        date: '23/03/2022',
        img: '../images/rain.png',
        degrees: '10C',
        weather: 'rain'
    },
    {
        id: 2,
        day: 'sunday',
        date: '23/03/2022',
        img: '../images/rain.png',
        degrees: '10C',
        weather: 'rain'
    },
    {
        id: 3,
        day: 'sunday',
        date: '23/03/2022',
        img: '../images/rain.png',
        degrees: '10C',
        weather: 'rain'
    },
    {
        id: 4,
        day: 'sunday',
        date: '23/03/2022',
        img: '../images/rain.png',
        degrees: '10C',
        weather: 'rain'
    },
    {
        id: 5,
        day: 'sunday',
        date: '23/03/2022',
        img: '../images/rain.png',
        degrees: '10C',
        weather: 'rain'
    }

]

export default CityWeather;
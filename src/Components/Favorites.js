import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Item from './Item';
import { currentWeatherRequest } from '../Api'; 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Div = styled.div`
padding: 1rem;
    .ItemsDiv{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .link{
        text-decoration:none;
    }
`;

const Favorites = ()=>{
    const[localCurrentWeatherList, setLocalCurrentWeatherList] = useState([]);
    const favoritesList = useSelector(state=>state.favorites.favoritesList);

    
    useEffect(()=>{
         favoritesList.map((item, index)=>{
           
                currentWeatherRequest(item.key).then(result=>{
                setLocalCurrentWeatherList(lastFavorites=> [...lastFavorites, result.data]);
             })
        })
    }, [favoritesList]);
      

    const mapFavoritesToCard = ()=>{
        if (favoritesList.length === 0) return <div style={{ fontSize: '2vw' }}>No Favorites</div>;
        return localCurrentWeatherList.map((item, index)=>{
            return <Link className='link' to={`/home/${favoritesList[index].key}`}><Item
            key={Math.random()}
            cityname={favoritesList[index].name}
            img={item[0].WeatherIcon}
            degrees={item[0].Temperature.Metric.Value}
            weather={item[0].WeatherText}
            />
            </Link>
        })
       
    }
        
       
    return(
        <Div>
            <h2>My Favorites:</h2>
            <div className='ItemsDiv'>
            {mapFavoritesToCard()}
            </div>
        </Div>
    );
}

export default Favorites;
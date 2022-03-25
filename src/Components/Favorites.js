import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Item from './Item';
import { currentWeatherRequest } from '../Api'; 

const Div = styled.div`
padding: 1rem;
    .ItemsDiv{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;

const Favorites = ()=>{
    const favoritesList = useSelector(state=>state.favorites.favoritesList);
    return(
        <Div>
            <h2>My Favorites:</h2>
            <div className='ItemsDiv'>
            {favoritesList.map(item=>{
                const data = currentWeatherRequest(item.key).then(result=>{
                    console.log(result.data);
                    return result.data;
                })
                console.log(data);
            })
            }
            </div>
        </Div>
    );
}

export default Favorites;
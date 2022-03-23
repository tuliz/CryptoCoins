import styled from '@emotion/styled';
import {Home, Favorite, Brightness4} from '@mui/icons-material';
import { Button } from '@mui/material';
import {Link, Outlet} from 'react-router-dom';

const Div = styled.div`
 display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background-color: #4E5D89;
    color: white;
    h2{
        padding-left:10px;
    }
    .IconName{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 80%;
        font-weight:bolder;
    }
    .IconsDiv{
        display: flex;
    }
    Button{
        color: white;
    }
    Button:hover{
        color:black;
    }
    }
`;

const Header = () =>{

    return(
        <div>
        <Div>
          <h2>What's My Weather</h2>
          <div className='IconsDiv'>

            <div className='IconName'><Button><Brightness4/></Button>Mode</div> 
            <div className='IconName'><Link to='/home'><Button><Home/></Button></Link>Home</div> 
            <div className='IconName'><Link to='/favorites'><Button><Favorite/></Button></ Link>Favorites</div> 

          </div>
        </Div>
        <Outlet/>
        </div>

    )
}

export default Header;
import styled from '@emotion/styled';
import {Home, Favorite, Brightness4} from '@mui/icons-material';
import { Button } from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {lightMode, darkMode} from '../Actions/modeSlice';
import { useState } from 'react';

const Light = styled.div`
background-color:white;
    #header{
        display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background-color: #4E5D89;
    color: white;
    }
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
`;

const Dark = styled.div`
     background-color:gray;
     #header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        background-color: black;
        color: white;
       }
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
        color: gray;
    }
    Button:hover{
        color:white;
    }
`;


const Header = () =>{
    const dispatch = useDispatch();
    const mode = useSelector(state => state.mode.value);
    const[Choosendiv, setChoosendiv]= useState(Light);

    const changeMode = ()=>{
        if(mode === 'light'){
            dispatch(darkMode());
            setChoosendiv(Dark);
        }
        else{
            dispatch(lightMode());
            setChoosendiv(Light);
        }
    }

    return(
        <Choosendiv>
        <div id='header'>
           <h2>What's My Weather</h2>
           <div className='IconsDiv'>
              <div className='IconName'><Button onClick={changeMode}><Brightness4/></Button>Mode</div> 
              <div className='IconName'><Link to='/home'><Button><Home/></Button></Link>Home</div> 
              <div className='IconName'><Link to='/favorites'><Button><Favorite/></Button></ Link>Favorites</div> 
            </div>
        </div>
          
        <div className='outlet'>
          <Outlet/>
        </div>
        </Choosendiv>

    )
}

export default Header;
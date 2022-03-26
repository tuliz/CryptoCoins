import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Notfound from './Notfound';
import { Routes, Route } from 'react-router-dom';
import { setCity } from '../Actions/homeSlice';
import { geolocationRequest } from "../Api";
import { useDispatch } from 'react-redux';
const App = ()=>{
  const dispatch = useDispatch();
  
  useEffect(()=>{
    getCurrentGeoLocation();
  }, []);

  const getCurrentGeoLocation = () =>{
    navigator.geolocation.getCurrentPosition(position=>{
      geolocationRequest(position.coords.latitude, position.coords.longitude)
      .then(result=>{dispatch(setCity({key: result.data.Key, name: result.data.LocalizedName}))});

     });
  }


  return (
  <Routes>
    <Route path='/' element={<Header/>}>
      <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/home/:city' element={<Home/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Route>
  </Routes>
  );
}

export default App;

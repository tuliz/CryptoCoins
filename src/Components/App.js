import React from 'react';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import Notfound from './Notfound';
import { Routes, Route } from 'react-router-dom';
const App = ()=>{
  return (
  <Routes>
    <Route path='/' element={<Header/>}>
      <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Route>
  </Routes>
  );
}

export default App;

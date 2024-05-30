import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyProfile from './Components/MyProfile/MyProfile';
import Login from './Components/Authorization/Login';
import RegistrationContainer from './Components/Authorization/RegistrationContainer';
import SampleGamesLider from './Components/Сategories/SampleGameLider';
import CategoriesContainer from './Components/Сategories/CategoriesContainer';
import SampleMyprofileGameStatistic from './Components/MyProfile/SampleMyprofileGameStatistic';
import PrivateRoute from './Components/PrivateRoute';
import React, { useState } from 'react';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Categories" element={<CategoriesContainer />} />
          <Route path="/Myprofile" element={<MyProfile />} />
          <Route path="/MyprofileGames" element={<SampleMyprofileGameStatistic />} />
          <Route path="/GameLiders" element={<SampleGamesLider />} />
          <Route path="/register" element={<RegistrationContainer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
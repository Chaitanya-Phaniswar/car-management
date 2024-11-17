// src/pages/HomePage.js

import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import UserContext from '../context/UserContext';

const HomePage = () => {
  const {user} =useContext(UserContext)
  return (
    <>
      {user ? <Main /> : <Home />}
    </>
  );
};

export default HomePage;

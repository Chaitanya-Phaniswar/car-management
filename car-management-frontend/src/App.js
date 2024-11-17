import React, { useContext } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddCarPage from './pages/AddCarPage';
import CarListPage from './pages/CarListPage';
import UserContext from './context/UserContext';
import CarDetailsPage from './pages/CarDetailsPage';
import EditCarPage from './pages/EditCarPage';
const App = () => {
  const {user} = useContext(UserContext);
  return(
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {user ? (
  <>
    <Route path="/add-car" element={<AddCarPage />} />
    <Route path="/cars" element={<CarListPage />} />
    <Route path="/cars/:id" element={<CarDetailsPage />} />
    <Route path="/edit-car/:id" element={<EditCarPage />} />
  </>
) : (
  <Route path="*" element={<Navigate to="/login" replace />} />
)}
    </Routes>
    </>)
};

export default App;

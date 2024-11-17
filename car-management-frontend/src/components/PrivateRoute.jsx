import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext); // Access the user from context

  // If user is authenticated, render the component
  // Otherwise, redirect to login page
  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

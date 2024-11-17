import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [contextLoading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Read user data from cookies on page load (even after refresh)
  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    const userId = Cookies.get('userId');
    
    if (token && username && userId) {
      setUser({ token, username, userId });
    } else {
      setUser(null); // If cookies don't exist or are invalid, set user to null
    }
    
    setLoading(false); // Set loading to false after checking the cookies
  }, []); // Empty dependency array to only run on mount

  const loginUser = (token, username, userId) => {
    // Set cookies with expiration time
    Cookies.set('token', token, { expires: 7, path: '' });
    Cookies.set('username', username, { expires: 7, path: '' });
    Cookies.set('userId', userId, { expires: 7, path: '' });
    
    setUser({ token, username, userId }); // Update user state
    navigate('/'); // Navigate to the home page after login
  };

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('userId');
    setUser(null); // Set user state to null after logout
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, contextLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

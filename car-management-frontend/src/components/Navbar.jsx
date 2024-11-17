import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <DirectionsCarIcon />
        </IconButton>

        {/* Main Title as Link to Home */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Car Management App
          </Link>
        </Typography>
      

        {/* Navigation Links */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Welcome, {user.username}
            </Typography>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Adjust the import path as needed

const Home = () => {
  const { user } = useContext(UserContext); // Access the user from context
  const navigate = useNavigate();

  const handleBrowseCars = () => {
    navigate('/cars'); // Redirect to the "browse cars" page
  };
  const handleAddNewCar = () => {
    navigate('/add-car');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://m.economictimes.com/thumb/msid-106775052,width-1600,height-900,resizemode-4,imgsize-69266/mclaren-750s-launched-in-india-at-rs-5-91-crore-what-makes-it-so-expensive.jpg)', // Replace with your yellow car image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // Default white color for text
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="md" sx={{ zIndex: 2 }}>
        {/* Welcome Text */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 700, 
              fontSize: { xs: '2rem', sm: '3rem' }, 
              mb: 3,
              fontFamily: '"Roboto", sans-serif', // Clean font
              color: 'rgba(10,130,13, 0.8)', // Soft white with opacity for better readability
            }}
          >
            Welcome to the Car Management Application
          </Typography>
          {/* <Typography 
            variant="h5" 
            color="rgba(0,255,0)" // Lighter white for secondary text
            sx={{ mb: 3, fontFamily: '"Roboto", sans-serif' }}
          >
            Easily manage your car inventory. Add, view, edit, and delete your cars with ease.
          </Typography> */}
        </Box>

        {/* Buttons Grid */}
        <Grid container spacing={3} justifyContent="center">
          {/* Show 'Browse Cars' button if user is logged in */}
          {user && user.token ? (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleBrowseCars}
                  sx={{
                    width: '250px',
                    fontSize: '1rem',
                    padding: '12px',
                    borderRadius: '30px',
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                    backgroundColor: '#d32f2f',
                  }}
                >
                  Browse Your Cars
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleAddNewCar}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    width: '250px',
                    fontSize: '1rem',
                    padding: '12px',
                    borderRadius: '30px',
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: '#1976d2',
                    },
                    backgroundColor: '#1976d2',
                  }}
                >
                  Add New Car
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleLogin}
                  sx={{
                    width: '250px',
                    fontSize: '1rem',
                    padding: '12px',
                    borderRadius: '30px',
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: '#1976d2',
                    },
                    backgroundColor: '#1976d2',
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSignup}
                  sx={{
                    width: '250px',
                    fontSize: '1rem',
                    padding: '12px',
                    borderRadius: '30px',
                    boxShadow: 3,
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                    backgroundColor: '#d32f2f',
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

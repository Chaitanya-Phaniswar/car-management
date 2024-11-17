import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Adjust the import path as needed

const Main = () => {
  const { user } = useContext(UserContext); // Access the user from context
  const navigate = useNavigate();

  const handleBrowseCars = () => {
    navigate('/cars'); // Redirect to the "browse cars" page
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to the Car Management Application
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Easily manage your car inventory. Add, view, edit, and delete your cars with ease.
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
        direction="row" // Ensure the buttons are aligned horizontally
      >
        {/* Show 'Browse All Cars' button if user is logged in */}
        {user && user.token && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleBrowseCars}
              sx={{ width: '250px' }}
            >
              Browse Your Cars
            </Button>
          </Grid>
        )}

        {/* Always show 'Add New Car' button */}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            href="/add-car"
            sx={{ width: '250px' }}
          >
            Add New Car
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;

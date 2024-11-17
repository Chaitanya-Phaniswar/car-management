import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardMedia, Chip } from '@mui/material';
import { getCarById, deleteCar } from '../services/authService';
import UserContext from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetailsPage = () => {
  const { user, contextLoading } = useContext(UserContext); // Use loading to check if user context is ready
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (contextLoading) return;
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }

    const fetchCarDetails = async () => {
      try {
        const response = await getCarById(id, user.token); // Make sure to use user.token for authorization
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id, user, navigate , contextLoading]);

  const handleDelete = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id, user.token); // Make sure to use user.token for authorization
        navigate('/cars');
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  return (
    <Container>
      {car ? (
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">{car.title}</Typography>
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate(`/edit-car/${id}`)} sx={{ ml: 2 }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
                Delete
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2, mb: 3 }}>
            {car.tags && car.tags.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {car.tags.map((tag, index) => {
                  const words = tag.split(' ');
                  return words.map((word, wordIndex) => (
                    <Chip
                      key={`${index}-${wordIndex}`}
                      label={word}
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: '50px', padding: '6px 12px' }}
                    />
                  ));
                })}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No tags available
              </Typography>
            )}
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {car.description}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {car.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="300" // Adjusted the height here to make the image bigger
                    image={image}
                    alt={`Car Image ${index + 1}`}
                    sx={{
                      objectFit: 'contain', // Ensure the image does not crop
                      width: '100%', // Ensure the image takes up the full width of the card
                      borderRadius: '10px', // Optional: adds a rounded border to images for a cleaner look
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default CarDetailsPage;

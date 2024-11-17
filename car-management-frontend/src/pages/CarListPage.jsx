import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserCars } from '../services/authService'; // Assuming this is your API service

const CarListPage = () => {
  const { user, contextLoading } = useContext(UserContext);
  const [cars, setCars] = useState([]); // All cars fetched from API
  const [filteredCars, setFilteredCars] = useState([]); // Cars filtered based on search
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [loading, setLoading] = useState(true); // Loading state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the index of the current image
  const navigate = useNavigate();

  // Fetch cars from API
  useEffect(() => {
    if (contextLoading) return; // Wait for context to load
    if (!user) {
      // Redirect to login if user is not available
      navigate('/login');
      return;
    }

    const fetchCars = async () => {
      try {
        const response = await getUserCars(user.token); // API call to fetch cars
        setCars(response.data);
        setFilteredCars(response.data); // Initially show all cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    if (user.token) {
      fetchCars();
    }
  }, [user, contextLoading, navigate]); // Dependency array includes user, contextLoading, and navigate

  // Filter cars based on the search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCars(cars); // If no search term, show all cars
    } else {
      const filtered = cars.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredCars(filtered);
    }
  }, [searchTerm, cars]); // Re-filter when searchTerm or cars change

  // Handle image change every 2 seconds
  useEffect(() => {
    if (filteredCars.length === 0) return; // Prevent error if there are no cars

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredCars[0].images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [filteredCars]); // Effect runs when filteredCars changes

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term on input change
  };

  if (loading) {
    return <Typography variant="body1" color="textSecondary">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }}>
        My Cars
      </Typography>

      {/* Add New Car Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate('/add-car')}
      >
        Add New Car
      </Button>

      {/* Search Input */}
      <TextField
        label="Search Cars"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mt: 3, mb: 3 }}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Image Section */}
              <CardMedia
                component="img"
                height="200" // Fixed image height
                image={car.images[currentImageIndex] || 'https://via.placeholder.com/150'}
                alt={car.title}
                sx={{
                  objectFit: 'contain', // Prevent image cropping
                  width: '100%',
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                {/* Title */}
                <Typography variant="h6">{car.title}</Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden', // Hide overflowing text
                    textOverflow: 'ellipsis', // Add ellipsis if text is too long
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Limit to 3 lines
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {car.description}
                </Typography>

                {/* Button to view details */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/cars/${car._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarListPage;

import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCarById, updateCar } from '../services/authService';
import UserContext from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditCarPage = () => {
  const { user, contextLoading } = useContext(UserContext);  // Ensure contextLoading is also retrieved
  const navigate = useNavigate();
  const { id } = useParams();

  // State variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Old image URLs
  const [newImages, setNewImages] = useState([]); // New image files
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch car details on load
  useEffect(() => {
    // If the context is still loading or no user, redirect to login
    if (contextLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch car details if user exists
    const fetchCarDetails = async () => {
      try {
        const response = await getCarById(id, user.token);
        const car = response.data;
        setTitle(car.title);
        setDescription(car.description);
        setTags(car.tags || []);
        setImages(car.images || []);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id, user, contextLoading, navigate]);

  // Handle image selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // Add a new tag
  const handleAddTag = (event) => {
    if (event) event.preventDefault();
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
      setNewTag('');
    }
  };

  // Remove a tag
  const handleTagDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Remove an image
  const handleImageDelete = (index, isNewImage = false) => {
    if (isNewImage) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare data for submission
    const updatedCarData = {
      title,
      description,
      tags: JSON.stringify(tags), // Send tags as JSON string
      imageLinks: [...images], // Old image URLs
      images: [...newImages], // New image files
    };

    try {
      await updateCar(id, updatedCarData, user.token);
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error('Error updating car:', error);
    } finally {
      setLoading(false);
    }
  };

  // Preview old and new images
  const imagePreviews = [...images, ...newImages].map((image, index) => {
    const isNewImage = newImages.includes(image);
    const url = isNewImage ? URL.createObjectURL(image) : image;
    return (
      <Box
        key={index}
        sx={{ display: 'inline-block', marginRight: 2, position: 'relative' }}
      >
        <img
          src={url}
          alt={`Preview ${index}`}
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 5 }}
        />
        <IconButton
          onClick={() => handleImageDelete(index, isNewImage)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'red',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'lightgray' },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }}>
        Edit Car Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              label="Car Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="car-images"
            />
            <label htmlFor="car-images">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{ mr: 2 }}
              >
                Upload New Images
              </Button>
            </label>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {imagePreviews}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              fullWidth
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
            />
            <Button
              variant="contained"
              onClick={handleAddTag}
              sx={{ mt: 1 }}
            >
              Add Tag
            </Button>
            <Box sx={{ mt: 2 }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleTagDelete(index)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditCarPage;

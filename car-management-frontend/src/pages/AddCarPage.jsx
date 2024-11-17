import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Chip, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon for removing images
import { addCar } from '../services/authService'; // Import your addCar function
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddCarPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize the navigate function
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle image file selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new images to the list
  };

  // Handle tag input
  const handleTagChange = (event) => {
    setNewTag(event.target.value);
  };

  // Add tag to the list
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare data to send to the backend
    const newCarData = {
      title,
      description,
      tags,
      images,
    };

    try {
      await addCar(newCarData, user.token); // Send the form data to the backend
      navigate('/cars'); // Redirect to the cars page after successful submission
    } catch (error) {
      console.error('Error adding car:', error);
    } finally {
      setLoading(false);
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setImages([]);
      setTags([]);
    }
  };

  // Remove image from the images array
  const handleImageDelete = (index) => {
    setImages(images.filter((image, i) => i !== index)); // Remove the image at the given index
  };

  // Preview images (display the selected images as thumbnails)
  const imagePreviews = images.map((image, index) => {
    const url = URL.createObjectURL(image);
    return (
      <Box key={index} sx={{ display: 'inline-block', marginRight: 2, position: 'relative' }}>
        <img src={url} alt={`Preview ${index}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
        <IconButton
          onClick={() => handleImageDelete(index)} // Handle delete on click
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
        Add New Car
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
                Upload Images
              </Button>
            </label>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {imagePreviews}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Tags"
              value={newTag}
              onChange={handleTagChange}
              fullWidth
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Box sx={{ mt: 2 }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => setTags(tags.filter((t, i) => i !== index))}
                  sx={{ mr: 1 }}
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
              {loading ? 'Submitting...' : 'Add Car'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCarPage;

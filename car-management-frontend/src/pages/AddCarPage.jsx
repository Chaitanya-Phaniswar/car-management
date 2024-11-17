import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Chip, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { addCar } from '../services/authService';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AddCarPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    title: '',
    description: '',
    images: '',
    tags: '',
  });

  // Validate title length
  const validateTitle = (title) => {
    if (title.length < 4) return "Title should be at least 4 characters.";
    if (title.length > 100) return "Title should be less than 100 characters.";
    return '';
  };

  // Validate description length
  const validateDescription = (description) => {
    if (description.length < 15) return "Description should be at least 15 characters.";
    if (description.length > 1000) return "Description should be less than 1000 characters.";
    return '';
  };

  // Validate images array (max 10 images)
  const validateImages = (images) => {
    if (images.length > 10) return "You can upload a maximum of 10 images.";
    const invalidImage = images.find(image => !['image/jpeg', 'image/png'].includes(image.type));
    if (invalidImage) return "Only JPEG and PNG images are allowed.";
    return '';
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images, ...files];
    const validationError = validateImages(newImages);
    if (validationError) {
      setError((prev) => ({ ...prev, images: validationError }));
    } else {
      setError((prev) => ({ ...prev, images: '' }));
      setImages(newImages);
    }
  };

  // Handle tag input
  const handleTagChange = (event) => {
    setNewTag(event.target.value);
  };

  // Add tag to the list
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Handle form submission with validation
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError({
      title: '',
      description: '',
      images: '',
      tags: '',
    });

    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    const imagesError = validateImages(images);

    if (titleError || descriptionError || imagesError) {
      setError({
        title: titleError,
        description: descriptionError,
        images: imagesError,
        tags: '',
      });
      setLoading(false);
      return;
    }

    const newCarData = {
      title,
      description,
      tags,
      images,
    };

    try {
      await addCar(newCarData, user.token);
      navigate('/cars');
    } catch (error) {
      console.error('Error adding car:', error);
    } finally {
      setLoading(false);
      setTitle('');
      setDescription('');
      setImages([]);
      setTags([]);
    }
  };

  // Remove image from the images array
  const handleImageDelete = (index) => {
    setImages(images.filter((image, i) => i !== index));
  };

  // Preview images (display the selected images as thumbnails)
  const imagePreviews = images.map((image, index) => {
    const url = URL.createObjectURL(image);
    return (
      <Box key={index} sx={{ display: 'inline-block', marginRight: 2, position: 'relative' }}>
        <img src={url} alt={`Preview ${index}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
        <IconButton
          onClick={() => handleImageDelete(index)}
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

      {/* Display error messages */}
      {Object.values(error).some((err) => err) && (
        <Box sx={{ mb: 3, color: 'red' }}>
          {Object.entries(error).map(
            ([key, msg]) =>
              msg && (
                <Typography key={key} variant="body1">
                  {msg}
                </Typography>
              )
          )}
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              label="Car Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              error={Boolean(error.title)}
              helperText={error.title}
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
              error={Boolean(error.description)}
              helperText={error.description}
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
            {error.images && <Typography color="error">{error.images}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Tags"
              value={newTag}
              onChange={handleTagChange}
              fullWidth
            />
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => setTags(tags.filter((t, i) => i !== index))}
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleAddTag}
              disabled={!newTag.trim()}
            >
              Add Tag
            </Button>
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

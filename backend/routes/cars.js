const express = require('express');
const Car = require('../models/Car');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig'); 
const deleteImageFromCloudinary= require('../utils/cloudinaryUtils') // Multer config for Cloudinary
const router = express.Router();

// Add a new car with image upload
router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user.id;

  // Extract image URLs from Cloudinary response
  const imageUrls = req.files.map(file => file.path);

  try {
    const car = new Car({
      user: userId,
      title,
      description,
      tags,
      images: imageUrls,  // Save the URLs of uploaded images
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cars of the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const cars = await Car.find({ user: userId });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search cars globally by keyword
router.get('/search', authMiddleware, async (req, res) => {
  const { query } = req.query;

  try {
    const cars = await Car.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific car by ID
router.get('/:id', authMiddleware, async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a car by ID
// Update a car by ID
// Update a car by ID
router.put('/:id', authMiddleware, upload.array('images', 10), async (req, res) => {
  const carId = req.params.id;
  const { title, description, tags, imageLinks } = req.body;

  try {
    // Parse `tags` and `imageLinks` as arrays
    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedImageLinks = imageLinks ? JSON.parse(imageLinks) : [];

    // Get new image URLs from uploaded files
    const newImageUrls = req.files ? req.files.map(file => file.path) : [];

    // Find the car to update
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    // Merge old image URLs with new uploaded image URLs
    const updatedImageUrls = [...parsedImageLinks, ...newImageUrls];

    // Update the car with new data
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { 
        title,
        description,
        tags: parsedTags,  // Use parsed tags array
        images: updatedImageUrls,  // Use merged image URLs
      },
      { new: true }
    );

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: error.message });
  }
});


// Delete a car by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  const carId = req.params.id;

  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

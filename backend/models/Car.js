// backend/models/Car.js

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, 'Exceeds the limit of 10 images'],
  },
}, { timestamps: true });

// Validate the image limit (max 10 images)
function arrayLimit(val) {
  return val.length <= 10;
}

const Car = mongoose.model('Car', carSchema);
module.exports = Car;

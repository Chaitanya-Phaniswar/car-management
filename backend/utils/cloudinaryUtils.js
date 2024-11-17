const deleteImageFromCloudinary = async (imageUrl) => {
    const imageId = extractImageId(imageUrl); // Extract the image ID from the URL (Cloudinary specific)
    // Assuming you're using Cloudinary, use their API to delete the image
    const cloudinary = require('cloudinary').v2;
  
    try {
      await cloudinary.uploader.destroy(imageId); // Delete the image using Cloudinary API
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  };
  
  // Function to extract image ID from Cloudinary URL
  const extractImageId = (url) => {
    const regex = /\/v\d+\/([^/]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  module.exports = deleteImageFromCloudinary
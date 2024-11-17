// src/services/authService.js

import axios from 'axios';

const API_URL = `http://localhost:5000/api`;

export const signup = async (data) => {
    return await axios.post(`${API_URL}/auth/signup`, data);
  };
  
export const login = async (data) => {
    return await axios.post(`${API_URL}/auth/login`, data);
};


export const addsCar = async (data, token) => {
  return await axios.post(`${API_URL}/cars`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getUserCars = async (token) => {
  return await axios.get(`${API_URL}/cars`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// src/services/authService.js

export const getCarById = async (id, token) => {
    return await axios.get(`${API_URL}/cars/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  };
  
  //import axios from 'axios';

  export const updateCar = async (id, data, token) => {
    const formData = new FormData();
  
    // Append text fields to the FormData
    formData.append('title', data.title);
    formData.append('description', data.description);
  
    // Send `imageLinks` as a JSON string (to handle multiple old images)
    formData.append('imageLinks', JSON.stringify(data.imageLinks));
  
    // Send `tags` as a JSON string (to handle array format)
    formData.append('tags', data.tags);
  
    // Append new images to FormData (if they exist)
    data.images.forEach(image => formData.append('images', image)); 
  
    try {
      const response = await axios.put(`${API_URL}/cars/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };
  

  export const deleteCar = async (id, token) => {
    return await axios.delete(`${API_URL}/cars/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
  };

  // src/services/authService.js


export const searchCars = async (token, query) => {
  try {
    const response = await axios.get('/api/cars/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: query, // Send the search query as a query parameter
      },
    });
    return response;
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

export const addCar = async (data, token) => {
  const formData = new FormData();

  // Append regular data (title, description, tags)
  formData.append('title', data.title);
  formData.append('description', data.description);
  data.tags.forEach(tag => formData.append('tags', tag)); // Assuming `tags` is an array

  // Append images (which are File objects)
  data.images.forEach(image => formData.append('images', image)); // Assuming `images` is an array of File objects

  // Send the request with the appropriate headers and FormData
  try {
    const response = await axios.post(`${API_URL}/cars`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // No need to manually set Content-Type, axios will do it for us with FormData
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error; // Rethrow the error so it can be handled where the function is called
  }
};

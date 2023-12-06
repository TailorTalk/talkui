import axios from 'axios';

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  
  // Adjust the URL to your server's endpoint
  await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// src/services/api.js

export const loginUser = async (username, password) => {
  try {
     const response = await fetch('/login', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
     });
     return response;
  } catch (error) {
     console.error('Error during login:', error);
     return null;
  }
};


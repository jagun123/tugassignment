// src/utils/api.js

import axios from 'axios';

export const fetchPhotos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
  return response.data;
};

export const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

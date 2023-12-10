
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your API base URL
export const MEDIA_URL = 'http://localhost:8000'
export const request = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle errors, for instance:
    console.error('API call error:', error);
    throw new Error('An error occurred while fetching data');
  }
};


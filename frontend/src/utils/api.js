// Base API URL - Will use relative URLs for Vercel deployment
const API_URL = '/api';

// Create API object with all methods
const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return await response.json();
  },

  // Image endpoints
  uploadImage: async (imageData) => {
    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });
    
    return await response.json();
  },

  getUserImages: async (token) => {
    const response = await fetch(`${API_URL}/images`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  },

  getImageById: async (id) => {
    const response = await fetch(`${API_URL}/images/${id}`, {
      method: 'GET',
    });
    
    return await response.json();
  },

  deleteImage: async (id, token) => {
    const response = await fetch(`${API_URL}/images/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  },

  // User endpoints
  getUserProfile: async (id, token) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  }
};

export default api;

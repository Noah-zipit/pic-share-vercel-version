// Base API URL - Will use relative URLs for Vercel deployment
const API_URL = '/api';

// Auth endpoints
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return await response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  return await response.json();
}

// Image endpoints
export async function uploadImage(imageData) {
  const response = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imageData),
  });
  
  return await response.json();
}

export async function getUserImages(token) {
  const response = await fetch(`${API_URL}/images`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
}

export async function getImageById(id) {
  const response = await fetch(`${API_URL}/images/${id}`, {
    method: 'GET',
  });
  
  return await response.json();
}

export async function deleteImage(id, token) {
  const response = await fetch(`${API_URL}/images/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
}

// User endpoints
export async function getUserProfile(id, token) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
}
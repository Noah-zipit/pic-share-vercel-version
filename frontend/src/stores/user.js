import { writable } from 'svelte/store';

// Check localStorage for saved user and token
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

// Initialize user store
export const user = writable(storedUser ? JSON.parse(storedUser) : null);
export const token = writable(storedToken || null);

// Save user to localStorage when it changes
user.subscribe(value => {
  if (value) {
    localStorage.setItem('user', JSON.stringify(value));
  } else {
    localStorage.removeItem('user');
  }
});

// Save token to localStorage when it changes
token.subscribe(value => {
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
});

// Helper functions for auth
export const login = (userData, authToken) => {
  user.set(userData);
  token.set(authToken);
};

export const logout = () => {
  user.set(null);
  token.set(null);
};
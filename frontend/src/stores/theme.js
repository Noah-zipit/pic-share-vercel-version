import { writable } from 'svelte/store';

// Check localStorage or use system preference as default
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const initialTheme = storedTheme || (prefersDarkMode ? 'dark' : 'light');

// Create the theme store
export const theme = writable(initialTheme);

// Save theme to localStorage when it changes
theme.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', value);
    // Update document class for global theming
    if (value === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
});

// Toggle theme function
export function toggleTheme() {
  theme.update(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
}
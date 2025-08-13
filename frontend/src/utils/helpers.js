// Format date to readable string
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Copy text to clipboard
export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

// Get base URL
export function getBaseUrl() {
  return window.location.origin;
}

// Create share URLs
export function createShareLinks(url, username) {
  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent(`Send me anonymous images! Check out my PicShare link:`);
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${message}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${message} ${encodedUrl}`
  };
}
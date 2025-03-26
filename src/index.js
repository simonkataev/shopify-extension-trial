import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Find the container element
  const container = document.getElementById('shopify-product-extension-root');
  
  // Only render if the container exists
  if (container) {
    ReactDOM.render(<App />, container);
  }
});

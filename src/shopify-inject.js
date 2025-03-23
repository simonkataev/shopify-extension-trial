// This script will be loaded by Shopify and will inject our React app into the product detail page

(function() {
  // Only run on product pages
  if (!window.location.pathname.includes('/products/')) {
    return;
  }

  // Create a container for our React app if it doesn't exist
  let container = document.getElementById('shopify-product-extension-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'shopify-product-extension-root';
    
    // Find the product info section to inject our app
    const productInfoSection = document.querySelector('.product__info-container');
    
    if (productInfoSection) {
      // Insert after the product description
      const productDescription = productInfoSection.querySelector('.product__description');
      if (productDescription) {
        productDescription.parentNode.insertBefore(container, productDescription.nextSibling);
      } else {
        // If no description, append to the end of the product info section
        productInfoSection.appendChild(container);
      }
    }
  }

  // Get the current script's URL to determine the base path for assets
  const getCurrentScriptPath = () => {
    // Get all script tags in the document
    const scripts = document.getElementsByTagName('script');
    
    // Find the current script (the one that's executing this code)
    let currentScript = scripts[scripts.length - 1];
    
    // For older browsers that don't support currentScript
    if (document.currentScript) {
      currentScript = document.currentScript;
    }
    
    // Get the src attribute
    const src = currentScript.src;
    
    // Return the base URL (everything up to the last slash)
    return src.substring(0, src.lastIndexOf('/') + 1);
  };
  
  // Get the base path for assets
  const basePath = getCurrentScriptPath();
  
  // Load our React app bundle
  const script = document.createElement('script');
  script.src = 'https://cdn.example.com/shopify-extension/bundle.js';
  script.async = true;
  document.body.appendChild(script);

  // Try to load our styles if they exist
  // Note: We'll make this optional since the styles might be included in the bundle
  const loadStyles = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.example.com/shopify-extension/styles.css';
    
    // Add an error handler in case the styles don't exist
    link.onerror = () => {
      console.log('Shopify extension styles not found, continuing without external styles');
      // Remove the link element to prevent 404 errors in the console
      link.parentNode.removeChild(link);
    };
    
    document.head.appendChild(link);
  };
  
  // Try to load styles, but don't block the app if they're missing
  loadStyles();
})();

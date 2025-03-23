import React, { useState } from 'react';
import ProductFeatures from './ProductFeatures';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="shopify-extension-container">
      <h2 className="shopify-extension-title">Product Information</h2>
      
      {loading ? (
        <div className="shopify-extension-loading">Loading product features...</div>
      ) : (
        <ProductFeatures />
      )}
    </div>
  );
};

export default App;

import React, { useState } from 'react';

const ProductFeatures = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Sample product features data
  const features = [
    {
      title: 'Key Features',
      content: [
        'Premium quality materials',
        'Handcrafted with attention to detail',
        'Durable and long-lasting',
        'Eco-friendly production'
      ]
    },
    {
      title: 'Specifications',
      content: [
        'Dimensions: 10" x 8" x 4"',
        'Weight: 2.5 lbs',
        'Material: 100% organic cotton',
        'Available in 5 colors'
      ]
    },
    {
      title: 'Care Instructions',
      content: [
        'Machine wash cold with like colors',
        'Tumble dry low',
        'Do not bleach',
        'Iron on low heat if needed'
      ]
    }
  ];

  return (
    <div className="product-features">
      <div className="product-features-tabs">
        {features.map((feature, index) => (
          <button
            key={index}
            className={`product-features-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {feature.title}
          </button>
        ))}
      </div>
      
      <div className="product-features-content">
        <h3>{features[activeTab].title}</h3>
        <ul>
          {features[activeTab].content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="product-features-cta">
        <button className="product-features-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductFeatures;

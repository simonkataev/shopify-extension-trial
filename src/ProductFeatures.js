import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductFeatures.css';

const cx = classNames.bind(styles);

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
    <div className={cx('features')}>
      <div className={cx('tabs')}>
        {features.map((feature, index) => (
          <button
            key={index}
            className={cx('tab', { active: activeTab === index })}
            onClick={() => setActiveTab(index)}
          >
            {feature.title}
          </button>
        ))}
      </div>
      
      <div className={cx('content')}>
        <h3>{features[activeTab].title}</h3>
        <ul>
          {features[activeTab].content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className={cx('cta')}>
        <button className={cx('button')}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductFeatures;

import React, { useState } from 'react';
import ProductFeatures from './ProductFeatures';
import classNames from 'classnames/bind';
import styles from './App.css';

const cx = classNames.bind(styles);

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>Product Information</h2>
      
      {loading ? (
        <div className={cx('loading')}>Loading product features...</div>
      ) : (
        <ProductFeatures />
      )}
    </div>
  );
};

export default App;

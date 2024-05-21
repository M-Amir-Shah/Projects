// src/components/Policy.js
import React from 'react';

const Policy = ({ title, description }) => {
  return (
    <div className="policy">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Policy;

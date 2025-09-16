import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`p-6 bg-[#282c34] rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
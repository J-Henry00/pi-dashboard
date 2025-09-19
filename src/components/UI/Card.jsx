import React from 'react';

const Card = ({ children, className = '', isDarkMode = true }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
      isDarkMode ? 'bg-[#282c34]' : 'bg-white'
    } ${className}`}>
      {children}
    </div>
  );
};

export default Card;
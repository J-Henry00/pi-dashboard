import React from 'react';

const Card = ({ children, className = '', isDarkMode = true }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 border ${
      isDarkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-300'
    } ${className}`} style={isDarkMode ? { backgroundColor: 'var(--card-bg)', borderColor: '#333' } : {}}>
      {children}
    </div>
  );
};

export default Card;
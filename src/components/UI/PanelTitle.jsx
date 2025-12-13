import React from 'react';

const PanelTitle = ({ title, isDarkMode = true }) => {
  return (
    <h2 
      className={`text-xl font-bold mb-4 transition-colors duration-300 ${
        isDarkMode ? '' : 'text-gray-900'
      }`}
      style={isDarkMode ? { color: 'var(--text-main)' } : {}}
    >
      {title}
    </h2>
  );
};

export default PanelTitle;
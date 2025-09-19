import React from 'react';

const PanelTitle = ({ title, isDarkMode = true }) => {
  return (
    <h2 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h2>
  );
};

export default PanelTitle;
import React from 'react';

const Button = ({ text, onClick, isDarkMode = true }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 my-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
        isDarkMode 
          ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
          : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
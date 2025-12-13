import React from 'react';

const Button = ({ text, onClick, isDarkMode = true }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 my-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-bold ${
        isDarkMode 
          ? 'text-white focus:ring-offset-[#1e1e1e]' 
          : 'text-white'
      }`}
      style={isDarkMode ? { 
        backgroundColor: 'var(--accent)', 
        border: '1px solid var(--accent)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      } : {
        backgroundColor: 'var(--accent)',
        border: '1px solid var(--accent)'
      }}
      onMouseEnter={(e) => {
        if (isDarkMode) {
          e.target.style.opacity = '0.8';
          e.target.style.transform = 'scale(1.02)';
        }
      }}
      onMouseLeave={(e) => {
        if (isDarkMode) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'scale(1)';
        }
      }}
    >
      {text}
    </button>
  );
};

export default Button;
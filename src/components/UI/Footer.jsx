import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = (isDarkMode = true) => {
  return (
    <div className='footer'>
      <footer className={!isDarkMode ? 'app-footer !text-black-300' : 'app-footer'}>
      <div className={!isDarkMode ? 'footer-social !text-black-300' : 'footer-social'}>
        <a className={isDarkMode ? '' : '!text-black-300'} href='mailto:info@hjindra.eu' aria-label='Email'>
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a
          className={isDarkMode ? '' : '!text-black-300'}
          href='https://www.instagram.com/hjindra'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          className={isDarkMode ? '' : '!text-black-300'}
          href='https://github.com/hjindra'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} hjindra.eu</p>
    </footer>
    </div>
  );
};

export default Footer;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavContext } from '../context';

import './Styles/thankYou.css';

function ThankYou() {
  const { isOpen } = useContext(NavContext);

  return (
    <div className={`thankyou-page ${isOpen ? 'blur' : ''}`}>
      <div className="thankyou-card">
        <div className="thankyou-title-container">
          <h2 className="thankyou-title">Thank You!</h2>
        </div>
        <div className="thankyou-message-container">
          <p className="thankyou-message">Your message has been sent successfully !</p>
          <p className="thankyou-message">We will get back to you soon.</p>
        </div>
        <div className="thankyou-button-container">
          <Link to="/" className="thankyou-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
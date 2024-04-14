import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="circle">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
      <Link to="/" className="home-button">Go to Home</Link>
    </div>
  );
}

export default NotFound;
import React, { useContext } from 'react';
import { NavContext } from './context';
import './Header.jsx';
import './notfound.css';

function NotFound() {
  const { isOpen } = useContext(NavContext);

  return (
    <div className='container'>
      <div className={`box ${isOpen ? 'blur' : ''}`}>
        {/* Illustration */}
        <div className="box__illustration">
          <img src='https://cdn-icons-png.freepik.com/256/2432/2432454.png?ga=GA1.1.795939797.1713963924&semt=ais_hybrid' alt="Not Found Illustration" />
        </div>
        {/* Description */}
        <div className="box__description">
          <div className="box__description-container">
            <div className="box__description-title">Whoops!</div>
            <div className="box__description-text">It seems like we couldn't find the page you were looking for</div>
          </div>
          <a href="/" className="box__button">Go Home</a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
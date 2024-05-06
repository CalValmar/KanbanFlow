import { useContext } from 'react';
import { NavContext } from './context';
import { Link } from 'react-router-dom';

import './Styles/header.css';

function Header() {
  const { isOpen, setIsOpen } = useContext(NavContext);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header class="header-container">
      {/* Logo Section */}
      <div class="logo-section">
        <Link to="/">
          <img class="logo-image" src="https://kanbanflow.com/img/press/Logo_blackbg_500x100_notrans.png" alt="Corporate Logo" />
        </Link>
      </div>

      {/* Login Button and Burger Bar */}
      <div class="buttons-container">
        <div class="login-section">
          <Link to='/login'>Login</Link>
        </div>

        {/* Navigation Burger Bar */}
        <div class="burger-bar">
          <button onClick={toggleNav} class="burger-button">
            <span class="burger-icon">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav class={isOpen ? 'nav-open' : 'nav-close'}>
        <div class="logo-container">
          <img src="https://kanbanflow.com/img/press/Logo_blackbg_500x100_notrans.png" alt="Corporate Logo" />
        
        {/* Close Button */}
        <button onClick={toggleNav} class="close-button">
          <span class="close-icon">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </button>
        </div>

        {/* Home Navigation */}
        <div class="home-nav">
          <Link to="/">Home</Link>
          <hr class="nav-separator" />
        </div>

        {/* About Navigation */}
        <div class="about-nav">
          <Link to="/#about">About</Link>
          <hr class="nav-separator" />
        </div>

        {/* Products Navigation */}
        <div class="products-nav">
          <Link to="/#products">Products</Link>
            <ul>
              <li>
                <Link to="/product1">Kanban board</Link>
              </li>
              <li>
                <Link to="/product2">Time tracking</Link>
              </li>
              <li>
                <Link to="/product3">Analytics & Reporting</Link>
              </li>
            </ul>
          <hr class="nav-separator" />
        </div>

        {/* Services Navigation */}
        <div class="services-nav">
          <Link to="/#services">Services</Link>
          <ul>
             <li>
               <Link to="/service1">Software development</Link>
             </li>
             <li>
               <Link to="/service2">Investigations</Link>
             </li>
             <li>
               <Link to="/service3">Training courses</Link>
             </li>
          </ul>
          <hr class="nav-separator" />
        </div>

        {/* Contact and Demo Navigation */}
        <div class="nav-links">
          <div class="contact-nav">
            <Link to="/#contact">Contact us</Link>
          </div>
          <div class="demo-nav">
            <Link to="/#demo">Try the demo</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
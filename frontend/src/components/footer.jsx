import React from 'react';
import './Styles/footer.css';

function Footer() {
  return (
    <footer class="footer-container">
      {/* Footer Section */}
      <div class="footer-section">
        {/* Footer Navigation */}
        <div class="footer-nav-container">
          <ul class="footer-nav-list">
            <li><a href="/#products">Products</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        {/* Copyright Section */}
        <div className="copyright-section">
          <p className="copyright-text">© KanbanFlow
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.open('https://www.youtube.com/watch?v=e_IIORCnBxI&ab_channel=10HoursMovies', '_blank');
          }} className="back-to-top"> 2024</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
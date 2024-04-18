import React from 'react';
import './footer.css';

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
        <div class="copyright-section">
          <p class="copyright-text">© KanbanFlow 2024</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
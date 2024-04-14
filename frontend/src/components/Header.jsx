import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <h1>Welcome to KanbanFlow</h1>
      <button onClick={toggleNav} className="burger"> ☰ </button>
      <nav className={isOpen ? 'nav-open' : 'nav-close'}>
        <ul>
          <li><Link to="/" onClick={toggleNav}>Home</Link></li>
          <li><Link to="/login" onClick={toggleNav}>Login</Link></li>
          <li><Link to="/register" onClick={toggleNav}>Register</Link></li>
          <li><Link to="/dashboard" onClick={toggleNav}>Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
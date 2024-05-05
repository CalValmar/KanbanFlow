import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { NavContext, UserContext } from './components/context';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/logged/dashboard/Dashboard';
import Login from './components/security/Login';
import Register from './components/security/Register';
import NotFound from './components/NotFound';
import Home from './components/Home';
import BoardDetails from './components/logged/dashboard/board/BoardDetails';

import './App.css';

function Main() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "*" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/dashboard" && !location.pathname.startsWith("/boards/") && <Footer />}
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('Gus');
  const [password, setPassword] = useState('dead');

  return (
    <Router>
      <NavContext.Provider value={{ isOpen, setIsOpen }}>
        <UserContext.Provider value={{ username, setUsername, password, setPassword }}>
          <Main />
        </UserContext.Provider>
      </NavContext.Provider>
    </Router>
  );
}

export default App;
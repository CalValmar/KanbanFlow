import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { NavContext, UserContext } from './components/context';

import Login from './components/Security/login';
import Register from './components/Security/register';

import Header from './components/header';
import Footer from './components/footer';

import Home from './components/home';
import Dashboard from './components/Dashboard/dashboard';
import BoardDetails from './components/BoardDetails/boardDetails';

import NotFound from './components/NotFound/notFound';

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
        <Route path="/boards/:userId/:boardId" element={<BoardDetails />} />
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
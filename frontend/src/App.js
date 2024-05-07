import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { NavContext, UserContext } from './components/context';

import Login from './components/Security/login';
import Register from './components/Security/register';
import ForgotPassword from './components/Security/forgotPassword';

import Header from './components/header';
import Footer from './components/footer';

import Home from './components/home';
import Dashboard from './components/Dashboard/dashboard';
import DashboardHeader from './components/dashboardHeader';
import BoardDetails from './components/BoardDetails/boardDetails';

import NotFound from './components/NotFound/notFound';

import './App.css';

function Main() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/dashboard" || location.pathname.startsWith("/boards/")
        ? <DashboardHeader />
        : <Header />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');
  const [createdAt, setCreatedAt] = useState(localStorage.getItem('createdAt') || '');

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('profilePic', profilePic);
    localStorage.setItem('createdAt', createdAt);
  }, [username, password, profilePic, createdAt]);

  return (
    <Router>
      <NavContext.Provider value={{ isOpen, setIsOpen }}>
        <UserContext.Provider value={{ username, setUsername, password, setPassword, profilePic, setProfilePic, createdAt, setCreatedAt }}>
          <Main />
        </UserContext.Provider>
      </NavContext.Provider>
    </Router>
  );
}

export default App;
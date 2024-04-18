import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/security/Login';
import Register from './components/security/Register';
import NotFound from './components/NotFound';
import Home from './components/Home'; // Import the Home component

import './App.css';

function Main() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "*" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Use the Home component */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "*" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
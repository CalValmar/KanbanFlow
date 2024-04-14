import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/security/Login';
import Register from './components/security/Register';
import NotFound from './components/NotFound';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>KanbanFlow</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
          <Footer />
        )}
        
      </Router>
    </div>
  );
}

export default App;
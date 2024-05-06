import React, { useState, useContext } from 'react';
import { NavContext } from '../context';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Styles/register.css';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { isOpen } = useContext(NavContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (usernameInput.trim() === '') {
      setError('Username is required !');
      return;
    }

    if (passwordInput.trim() === '') {
      setError('Password is required !');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register?username=' + usernameInput + '&password=' + passwordInput);

      if (response.status === 200) {
        console.log('Registered : ' + usernameInput + ' / ' + passwordInput); 

        setError('Successful ! Redirecting to login...');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('Registration failed !');
      }
    } catch (error) {
      console.error('Error registering');
      setError('Registration failed !');
    }
  };

  return (
    <div className={`register-page ${isOpen ? 'blur' : ''}`}>
      <div className="register-card">
        <div className="register-title-container">
          <h1 className="register-title">Register</h1>
        </div>
        <div className="register-form-container">
          <form onSubmit={handleRegister} className="register-form">
            <label>
              Username : 
              <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} placeholder="Username" required className="register-input" />
            </label>
            <label>
              Password : 
              <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" required className="register-input" />
            </label>           
          </form>
        </div>
        <div className="register-button-container">
          <button onClick={handleRegister} className="register-button">Register</button>
        </div>
        <div className="error-container">
          {error && <div className="error-message-container"><p className="error-message">{error}</p></div>}
        </div>
        <div className="login-link-container">
            <label>
              <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
              Show password
            </label> 
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/context';
import { NavContext } from '../../components/context';
import { Link, useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
  const { setUsername, setPassword } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen } = useContext(NavContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
      const response = await axios.post('http://localhost:5000/users/login?username=' + usernameInput + '&password=' + passwordInput);

      if (response.status === 200) {
        setUsername(usernameInput);
        setPassword(passwordInput);
        console.log('Logged in : ' + usernameInput + ' / ' + passwordInput); 
        navigate('/dashboard');
      } else {
        setError('Invalid username or password !');
      }
    } catch (error) {
      console.error('Error logging in : ' + error);
      setError('Invalid username or password !');
    }
  };

  return (
    <div className={`login-page ${isOpen ? 'blur' : ''}`}>
      <div className="login-card">
        <div className="login-title-container">
          <h2 className="login-title">Login</h2>
        </div>
        <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Username : 
              <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} placeholder="Username" required className="login-input" />
            </label>
            <label>
              Password : 
              <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" required className="login-input" />
            </label>           
          </form>
        </div>
        <div className="login-button-container">
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
        <div className="error-container">
          {error && <div className="error-message-container"><p className="error-message">{error}</p></div>}
        </div>
        <div className="forgot-password-container">
            <label>
              <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
              Show password
            </label> 
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
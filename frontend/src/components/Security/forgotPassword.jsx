import React, { useState, useContext } from 'react';
import { NavContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';

import './Styles/login.css';

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { isOpen } = useContext(NavContext);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (emailInput.trim() === '') {
      setError('Email is required !');
      return;
    }

    setMessage('Password reset email sent to : ' + emailInput);

    setTimeout(() => {
        navigate('/login');
        }, 3000); // Redirect to login page after 3 seconds
    
        // Here you would typically call an API to send a password reset email
        // For now, we'll just log the email and navigate back to the login page
        console.log('Password reset email sent to : ' + emailInput);
    };

    return (
    <div className={`login-page ${isOpen ? 'blur' : ''}`}>
        <div className="login-card">
            <div className="login-title-container">
                <h2 className="login-title">Forgot Password</h2>
            </div>
            <div className="login-form-container">
                <form onSubmit={handleResetPassword} className="login-form">
                    <label>
                        Email : 
                        <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email" required className="login-input" />
                    </label>
                </form>
            </div>
            <div className="login-button-container">
                <button onClick={handleResetPassword} className="login-button">Reset Password</button>
            </div>
            <div className="message-container">
                {message && <div className="message-message-container"><p className="message-message">{message}</p></div>}
            </div>
            <div className="error-container">
                {error && <div className="error-message-container"><p className="error-message">{error}</p></div>}
            </div>
            <div className="forgot-password-container">
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
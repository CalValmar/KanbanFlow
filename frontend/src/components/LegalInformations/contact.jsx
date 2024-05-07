import React, { useState, useContext } from 'react';
import { NavContext } from '../context';
import { useNavigate } from 'react-router-dom';

import './Styles/contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [liveDemo, setLiveDemo] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isOpen } = useContext(NavContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setError('All fields are required!');
      return;
    }

    // Here you would typically handle the form submission, e.g. send the form data to an API
    console.log('Form submitted', { name, email, message, liveDemo });

    setSuccessMessage('Message sent successfully!');

    setTimeout(() => {
      navigate('/thank-you');
    }, 3000); // Redirect to thank you page after 3 seconds
  };

  return (
    <div className={`contact-page ${isOpen ? 'blur' : ''}`}>
      <div className="contact-card">
        <div className="contact-title-container">
          <h2 className="contact-title">Contact Us</h2>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="contact-input" required />
          <label>
            Email:
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="contact-input" required />
          <label>
            Message:
          </label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="contact-input" required />
          <label style={{ display: 'block' }}>
            Request a live demo: &nbsp;  
          <input type="checkbox" checked={liveDemo} onChange={(e) => setLiveDemo(e.target.checked)} className="contact-checkbox" />
          </label>
          <div className="contact-button-container">
            <button type="submit" className="contact-button">Submit</button>
          </div>
        </form>
        <div className="message-container">
          {successMessage && <div className="message-message-container"><p className="message-message">{successMessage}</p></div>}
        </div>
        <div className="error-container">
          {error && <div className="error-message-container"><p className="error-message">{error}</p></div>}
        </div>
      </div>
    </div>
  );
}

export default Contact;
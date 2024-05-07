import { useContext, useEffect } from 'react';
import { NavContext, UserContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../data/dataManagementLayer';

import '../Styles/header.css';

function DashboardHeader() {
  const { isOpen, setIsOpen } = useContext(NavContext);
  const { setUsername, setPassword, profilePic, setProfilePic, createdAt, setCreatedAt } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const data = await getUser(localStorage.getItem('username'));
        const user = data.user;
        setProfilePic(user.profile_picture);
        setCreatedAt(user.created_at);
    };

    fetchData();
    }, [setProfilePic, setCreatedAt]);
    
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };
    
    const handleLogout = () => {
        setUsername('');
        setPassword('');
        setProfilePic('');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('createdAt');
        navigate('/');
    };
    
    return (
    <header className="header-container">
      {/* Logo Section */}
      <div className="logo-section">
        <Link to="/dashboard">
          <img className="logo-image" src="https://kanbanflow.com/img/press/Logo_blackbg_500x100_notrans.png" alt="Corporate Logo" />
        </Link>
      </div>

      {/* Logout Button and Burger Bar */}
      <div className="buttons-container">
        <div className="logout-section">
          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Navigation Burger Bar */}
        <div className="burger-bar">
          <button onClick={toggleNav} className="burger-button">
            <span className="burger-icon">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className={isOpen ? 'nav-open' : 'nav-close'}>
        <div className="logo-container">
            <img src="https://kanbanflow.com/img/press/Logo_blackbg_500x100_notrans.png" alt="Corporate Logo" />
            
            {/* Close Button */}
            <button onClick={toggleNav} className="close-button">
                <span className="close-icon">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </span>
            </button>
        </div>
        
        {/* Dashboard Navigation */}
        <div className="dashboard-nav">
            <Link to="/dashboard">Dashboard</Link>
            <hr className="nav-separator" />
        </div>

        {/* User Information */}
        <div className="user-info">
            <h3>Welcome, {localStorage.getItem('username')}</h3>
            <img src={profilePic} alt="Profile Pic" />
            <p>Member since: {new Date(createdAt).toLocaleDateString()}</p>
            <hr className="nav-separator" />
        </div>
      </nav>
    </header>
  );
}

export default DashboardHeader;
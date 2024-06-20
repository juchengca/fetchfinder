import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faPaw } from '@fortawesome/free-solid-svg-icons';

// TOP NAVIGATION BAR COMPONENT
const TopBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // axios request for logging out. redirected to login page upon successful logout
  const handleLogout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div style={{ marginLeft: '0.5rem', marginTop: '20px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      {/*Fetch Finder Home Button*/}
      <div>
        <Link to="/dogs/search?size=25&from=0&sort=breed%3Aasc" className="btn btn-ghost text-xl">
          <FontAwesomeIcon icon={faDog} style={{ marginRight: '8px' }} />
          FETCH FINDER
        </Link>
      </div>
      {/*Logout Button*/}
      {location.pathname !== '/' && (
        <div style={{ marginLeft: '500px' }}>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
            <FontAwesomeIcon icon={faPaw} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
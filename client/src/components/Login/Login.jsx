import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// LOGIN COMPONENT
const Login = () => {

  // states to store name and email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // axios request to hangle login by accessing provided endpoint
  // navigates to search page upon successful login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/login', { name, email }, { withCredentials: true });
      navigate('/dogs/search');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ marginLeft: '1.5rem' }}>
      <h2 style={{ marginBottom: '20px' }}>Welcome! Log in to Fetch Finder</h2>
      <form onSubmit={handleLogin}>
        {/*Name*/}
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', width: '200px', marginBottom: '10px' }}
          />
        </div>
        {/*Email*/}
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', width: '200px', marginBottom: '10px' }}
          />
        </div>
        <button className="btn btn-primary" type="submit" style={{ display: 'block' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
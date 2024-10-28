import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';

const Login = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (rut && password) {
      try {
        const response = await userService.login(rut, password);
        console.log('API Response:', response);
  
        if (response) {
          onLogin(response);
          navigate('/home'); 
        } else {
          setError('Invalid response data');
        }
      } catch (err) {
        setError('Login failed');
        console.error('Login error:', err);
      }
    }
  };
  
  
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rut">RUT:</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error */}
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rut && password) {
      onLogin(); 
      navigate('/home'); 
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
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don't you have an account <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;

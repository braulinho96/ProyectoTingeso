import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';

const Register = () => {
  const [rut, setRut] = useState('');                   // State to hold the raw RUT input
  const [formattedRut, setFormattedRut] = useState(''); // State to hold the formatted RUT for display
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formatRut = (value) => {
    // Remove all characters except numbers and 'K'
    const cleaned = value.replace(/[^0-9kK]/g, '');

    // Limit RUT to maximum length of 9 characters (8 digits + 1 verification digit)
    const limitedRut = cleaned.slice(0, 9); 

    // Get the numeric part and the verification digit
    const rutPart = limitedRut.slice(0, -1);
    const dv = limitedRut.slice(-1).toUpperCase(); // Get the last character as the verification digit (uppercase)

    // Format the RUT as 12345678-9
    return `${rutPart}-${dv}`.trim(); // Ensure no extra spaces
  };

  // Handle changes in the RUT input with formatting
  const handleRutChange = (e) => {
    const value = e.target.value;
    setRut(value); // Store the raw input value
    setFormattedRut(formatRut(value)); // Update the formatted value for display
  };

  // User registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 

    const user = { rut: formattedRut, 
      name, 
      password, solicitude_state: false, 
      id_rol: 2 };

    try {
      await userService.create(user);
      setSuccess('User registered successfully.');
      setTimeout(() => navigate('/'), 200); 

    } catch (err) {
      setError('The RUT is already registered.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="RUT - e.g., 12345678-9"
          value={formattedRut} // Use the formatted RUT for display
          onChange={handleRutChange}
          maxLength={12} // Maximum characters, including the hyphen
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/')}>Log in</button>
      </p>
    </div>
  );
};

export default Register;

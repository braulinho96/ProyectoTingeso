import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => (
  <nav style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed', // Mantener la barra lateral fija
    left: 0,
    top: 0,
    width: '200px', // Ancho de la barra lateral
    height: '100%', // Altura completa
    padding: '20px',
    background: '#f1f1f1',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)' // Sombra para un efecto de profundidad
  }}>
    <Link to="/home" style={{ marginBottom: '10px' }}>Home</Link>
    <Link to="/loan-simulation" style={{ marginBottom: '10px' }}>Loan Simulation</Link>
    <Link to="/loan-solicitude" style={{ marginBottom: '10px' }}>Loan Solicitude</Link>
    
    {isAuthenticated && (
      <button onClick={handleLogout} style={{ marginTop: 'auto' }}>
        Log out
      </button>
    )}
  </nav>
);

export default Navbar;

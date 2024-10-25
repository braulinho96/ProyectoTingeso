import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import LoanSimulation from './components/LoanSimulation';
import LoanSolicitude from './components/LoanSolicitude';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla autenticación

  // Funciones de login y logout
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Navbar solo si está autenticado */}
        {isAuthenticated && (
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        )}

        {/* Contenedor principal que ajusta su margen */}
        <div style={{ marginLeft: isAuthenticated ? '200px' : '0', padding: '20px', flex: 1 }}>
          <Routes>
            {/* Ruta principal: Redirige al home si está autenticado */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
              }
            />

            {/* Ruta Home: Protegida, solo accesible si está autenticado */}
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/" replace />
              }
            />
            
            {/* Ruta Simulación de Crédito: Protegida */}
            <Route
              path="/loan-simulation"
              element={
                isAuthenticated ? <LoanSimulation /> : <Navigate to="/" replace />
              }
            />
            
            {/* Ruta para la Solicitud de Préstamo */}
            <Route
              path="/loan-solicitude"
              element={
                isAuthenticated ? <LoanSolicitude /> : <Navigate to="/" replace />
              }
            />

            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
              }
            />

            {/* Ruta de Registro: No requiere autenticación */}
            <Route path="/register" element={<Register />} />

            {/* Ruta para manejar errores 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

